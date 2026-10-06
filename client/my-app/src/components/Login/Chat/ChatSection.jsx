import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Send, Smile, Loader2, MessageSquare, Check, CheckCheck } from 'lucide-react';

const API_URL = 'https://localhost:7026/api';
const EMOJIS = ['👍', '❤️', '👏', '😊', '🔥', '🐸', '🏊‍♂️', '🎉'];

export default function ChatSection({ trainers = [], currentUserId }) {
  const [activeTrainer, setActiveTrainer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingHistory, setLoadingLoadingHistory] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeReactionMsgId, setActiveReactionMsgId] = useState(null);

  const chatContainerRef = useRef(null); // Реф для контейнера сообщений

    const scrollToBottom = () => {
    if (chatContainerRef.current) {
        // Прокручиваем строго только блок сообщений, окно браузера останется неподвижным
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    };

  // Выбор первого тренера по умолчанию
  useEffect(() => {
    if (trainers.length > 0 && !activeTrainer) {
      setActiveTrainer(trainers[0]);
    }
  }, [trainers, activeTrainer]);

  // Загрузка истории чата
  const fetchMessages = useCallback(async (isInitial = false) => {
    if (!activeTrainer) return;
    const targetUserId = activeTrainer.userId || activeTrainer.UserId;
    if (!targetUserId) return;

    const token = localStorage.getItem('auth_token');
    if (isInitial) setLoadingLoadingHistory(true);

    try {
      const res = await fetch(`${API_URL}/chat/history/${targetUserId}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
        }
      }
    } catch (err) {
      console.error('Ошибка загрузки истории сообщений:', err);
    } finally {
      if (isInitial) setLoadingLoadingHistory(false);
    }
  }, [activeTrainer]);

  // Периодическое обновление сообщений (каждые 3 секунды)
  useEffect(() => {
    if (!activeTrainer) return;

    fetchMessages(true);
    const interval = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTrainer, fetchMessages]);

  // Прокрутка при изменении списка сообщений
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Отправка сообщения
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeTrainer) return;

    const targetUserId = activeTrainer.userId || activeTrainer.UserId;
    if (!targetUserId) {
      alert('У выбранного тренера не указан ID аккаунта.');
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Сессия истекла. Войдите в аккаунт заново.');
      return;
    }

    const textToSend = newMessage.trim();
    setNewMessage(''); // Сбрасываем поле ввода сразу для отклика UI
    setShowEmojiPicker(false);

    try {
      const res = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: targetUserId,
          text: textToSend
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Ошибка отправки сообщения');
      }

      const savedMsg = await res.json();
      setMessages((prev) => [...prev, savedMsg]);
    } catch (err) {
      alert(err.message || 'Не удалось отправить сообщение.');
      setNewMessage(textToSend); // Возвращаем текст при ошибке
    }
  };

  // Поставить или изменить реакцию на сообщение
  const handleReact = async (messageId, emoji) => {
    const token = localStorage.getItem('auth_token');
    setActiveReactionMsgId(null);

    try {
      const res = await fetch(`${API_URL}/chat/react/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ emoji })
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, emoji } : m))
        );
      }
    } catch (err) {
      console.error('Ошибка установки реакции:', err);
    }
  };

  return (
    <div className="profile-main-card">
      <h2 className="profile-section-title">
        <MessageSquare className="w-5 h-5 text-emerald-600" /> Диалоги с тренерами
      </h2>

      <div className="client-chat-layout">
        {/* Левая панель: список тренеров */}
        <div className="trainers-list-sidebar">
          <p className="sidebar-subtitle">Ваши тренеры:</p>
          <div className="trainers-stack">
            {trainers.map((t) => {
              const isSelected = activeTrainer?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTrainer(t)}
                  className={`trainer-chat-card ${isSelected ? 'selected' : ''}`}
                >
                  <span className="trainer-avatar-emoji">{t.photoUrl || t.photo || '🐸'}</span>
                  <div className="trainer-chat-info">
                    <div className="trainer-chat-name">{t.name}</div>
                    <div className="trainer-chat-spec">{t.specialization}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Правая панель: переписка */}
        <div className="chat-conversation-area">
          {activeTrainer ? (
            <>
              {/* Шапка диалога */}
              <div className="chat-header-info">
                <span className="status-indicator"></span>
                <span>Тренер {activeTrainer.name}</span>
              </div>

              {/* История сообщений */}
              <div className="chat-messages-container" ref={chatContainerRef}>
                {loadingHistory ? (
                  <div className="chat-loading-state">
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                    <span>Загрузка переписки...</span>
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((m) => {
                    const isMy = m.senderId?.toLowerCase() === currentUserId?.toLowerCase();
                    return (
                      <div
                        key={m.id}
                        className={`message-row ${isMy ? 'my-message' : 'their-message'}`}
                      >
                        <div className="message-bubble">
                          <p className="message-text">{m.text}</p>

                          <div className="message-footer-info">
                            <span>
                              {new Date(m.sentAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {isMy && (
                              <CheckCheck className="w-3.5 h-3.5 ml-1 text-white opacity-80" />
                            )}
                          </div>

                          {/* Кнопка реакции */}
                          <button
                            type="button"
                            className="btn-open-reactions"
                            onClick={() =>
                              setActiveReactionMsgId(
                                activeReactionMsgId === m.id ? null : m.id
                              )
                            }
                            title="Поставить реакцию"
                          >
                            😊
                          </button>

                          {/* Поповер выбора эмодзи для реакции */}
                          {activeReactionMsgId === m.id && (
                            <div className="reactions-menu">
                              {EMOJIS.map((e) => (
                                <button
                                  key={e}
                                  type="button"
                                  onClick={() => handleReact(m.id, e)}
                                >
                                  {e}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Отображение прикрепленной реакции */}
                          {m.emoji && (
                            <span className="message-reaction-badge">{m.emoji}</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="chat-empty-state">
                    Сообщений пока нет. Напишите тренеру {activeTrainer.name}! 🐸
                  </div>
                )}
              </div>

              {/* Форма ввода сообщения */}
              <form onSubmit={handleSendMessage} className="chat-input-row">
                <div className="input-group-relative">
                  <button
                    type="button"
                    className="emoji-trigger-btn"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    title="Выбрать эмодзи"
                  >
                    <Smile className="w-5 h-5 text-slate-400 hover:text-emerald-600 transition-colors" />
                  </button>

                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="chat-text-input"
                  />

                  {showEmojiPicker && (
                    <div className="emoji-menu-popover">
                      {EMOJIS.map((e) => (
                        <span
                          key={e}
                          className="emoji-item"
                          onClick={() => {
                            setNewMessage((prev) => prev + e);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-send" title="Отправить сообщение">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="chat-empty-state">
              Выберите тренера слева, чтобы начать диалог.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
