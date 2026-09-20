import React from 'react';
import './TrainerDescription.css';

function TrainerDescription(props) {
  const { description } = props;

  if (!Array.isArray(description)) {
    console.warn("TrainerDescription: prop 'description' is not an array.", description);
    return <div>Нет информации об описании.</div>;
  }

  return (
    <div className="trainer-description"> {/*  Обертка для всего описания */}
      {description.map((item, index) => (
        <div key={index} className="trainer-description__item"> {/* Обертка для каждого элемента */}
          <strong className="trainer-description__label">{item.label}:</strong>
          <span className="trainer-description__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default TrainerDescription;
