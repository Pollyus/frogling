using System.ComponentModel.DataAnnotations;

namespace Frogling.Api.Models;

public class UpdateProfileDto
{
    [Required]
    [StringLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [StringLength(30)]
    public string Phone { get; set; } = string.Empty;

    [StringLength(120)]
    public string ParentName { get; set; } = string.Empty;
}
