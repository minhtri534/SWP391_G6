using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ CORS: Cho phép frontend React truy cập
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
      policy => policy
        .WithOrigins("http://localhost:5173") // Đúng cổng Vite
              .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();

// Swagger cho dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Bật CORS đúng policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
