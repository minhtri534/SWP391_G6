﻿using backend.Models; // namespace chứa các model C#
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }

        
        public DbSet<Registration> Users { get; set; }
      
  
    }
}
