
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    [PrimaryKey(nameof(UserId), nameof(MembershipId))]
    public class UserMembership
    {
        [Key]
        public int UserId { get; set; }
        [Key]
        public int MembershipId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [ForeignKey(nameof(MembershipId))]
        public Membership Membership { get; set; }

    }
}