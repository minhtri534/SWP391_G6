CREATE DATABASE SWP391;
GO

USE SWP391;
GO

CREATE TABLE role (
  roleId INT IDENTITY(1,1) PRIMARY KEY,
  roleName NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE users (
  userId INT IDENTITY(1,1) PRIMARY KEY,
  userName NVARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender NVARCHAR(10) NOT NULL,
  phoneNum NVARCHAR(20) NOT NULL,
  password NVARCHAR(100) NOT NULL,
  roleId INT NOT NULL,
  status NVARCHAR(50) DEFAULT 'Active',
  joinDate DATE DEFAULT GETDATE(),
  FOREIGN KEY (roleId) REFERENCES role(roleId)
);
GO

CREATE TABLE coach_info (
  coachId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  phoneNum NVARCHAR(20),
  experience INT,
  available_time NVARCHAR(100),
  specialty NVARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE post (
  postId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  create_date DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE comment (
  commentId INT IDENTITY(1,1) PRIMARY KEY,
  postId INT,
  userId INT,
  content TEXT,
  created_date DATE DEFAULT GETDATE(),
  FOREIGN KEY (postId) REFERENCES post(postId),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE report (
  reportId INT IDENTITY(1,1) PRIMARY KEY,
  content TEXT,
  postId INT,
  userId INT,
  commentId INT,
  create_day DATE DEFAULT GETDATE(),
  FOREIGN KEY (postId) REFERENCES post(postId),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (commentId) REFERENCES comment(commentId)
);
GO

CREATE TABLE quit_plan (
  planId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  coachId INT NOT NULL,
  statusId INT,
  reason TEXT,
  start_date DATE,
  goal_date DATE,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

CREATE TABLE badge (
  badgeId INT IDENTITY(1,1) PRIMARY KEY,
  badgeName NVARCHAR(100),
  description TEXT,
  condition_type NVARCHAR(50),
  value INT
);
GO

CREATE TABLE plan_milestone (
  milestoneId INT IDENTITY(1,1) PRIMARY KEY,
  planId INT,
  badgeId INT,
  title NVARCHAR(100),
  description TEXT,
  target_date DATE,
  FOREIGN KEY (planId) REFERENCES quit_plan(planId),
  FOREIGN KEY (badgeId) REFERENCES badge(badgeId)
);
GO

CREATE TABLE daily_progress (
  progressId INT IDENTITY(1,1) PRIMARY KEY,
  milestoneId INT,
  note TEXT,
  no_smoking BIT,
  symptoms TEXT,
  date DATE DEFAULT GETDATE(),
  FOREIGN KEY (milestoneId) REFERENCES plan_milestone(milestoneId)
);
GO

CREATE TABLE smoking_status (
  statusId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  time_period NVARCHAR(50),
  milestoneId INT,
  amount_per_day INT,
  frequency NVARCHAR(50),
  price_per_pack DECIMAL(10, 2),
  description TEXT,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (milestoneId) REFERENCES plan_milestone(milestoneId)
);
GO

CREATE TABLE coach_plan_badge (
  coachId INT,
  badgeId INT,
  planId INT,
  date_get DATE,
  PRIMARY KEY (coachId, badgeId, planId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (badgeId) REFERENCES badge(badgeId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE notification (
  notificationId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  relatedLogId INT NULL,
  relatedMilestoneId INT NULL,
  message TEXT,
  send_date DATE DEFAULT GETDATE(),
  type NVARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (relatedLogId) REFERENCES daily_progress(progressId),
  FOREIGN KEY (relatedMilestoneId) REFERENCES plan_milestone(milestoneId)
);
GO

CREATE TABLE feedback (
  feedbackId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  coachId INT,
  planId INT,
  content TEXT,
  rating INT,
  time_created DATE DEFAULT GETDATE(),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE membership (
  membershipId INT IDENTITY(1,1) PRIMARY KEY,
  membershipName NVARCHAR(100),
  price DECIMAL(10, 2),
  duration INT
);
GO

CREATE TABLE user_memberships (
  userId INT,
  membershipId INT,
  start_date DATE,
  end_date DATE,
  PRIMARY KEY (userId, membershipId),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (membershipId) REFERENCES membership(membershipId)
);
GO

CREATE TABLE payment (
  paymentId INT IDENTITY(1,1) PRIMARY KEY,
  userId_fk INT,
  membershipId_fk INT,
  amount DECIMAL(10, 2),
  pay_date DATE DEFAULT GETDATE(),
  method NVARCHAR(50),
  type NVARCHAR(50),
  status NVARCHAR(50),
  FOREIGN KEY (userId_fk, membershipId_fk) REFERENCES user_memberships(userId, membershipId)
);
GO

CREATE TABLE chat_log (
  chatId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  coachId INT,
  content TEXT,
  type NVARCHAR(50),
  status NVARCHAR(50),
  chat_date DATE DEFAULT GETDATE(),
  sender NVARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

CREATE TABLE booking_consultation (
  bookingId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  coachId INT,
  date DATE,
  type NVARCHAR(50),
  status NVARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

-- Insert mặc định role
INSERT INTO role (roleName)
VALUES 
('Guest'), 
('Member'), 
('Coach'), 
('Admin');
GO

-- Insert user (không cần truyền userId vì đã có IDENTITY)
INSERT INTO users (userName, age, gender, phoneNum, password, roleId, status, joinDate)
VALUES 
('Nguyen Van A', 25, 'Male', '0901000001', 'guest123', 1, 'Active', '2025-06-01'),
('Tran Van B', 28, 'Female', '0901000002', 'member123', 2, 'Active', '2025-06-02'),
('Pham Thi C', 35, 'Male', '0901000003', 'coach123', 3, 'Active', '2025-06-03'),
('Do Cao D', 30, 'Other', '0901000004', 'admin123', 4, 'Active', '2025-06-04');
GO
