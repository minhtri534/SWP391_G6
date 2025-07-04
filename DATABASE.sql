DROP DATABASE IF EXISTS SWP391;
GO

CREATE DATABASE SWP391;
GO

USE SWP391;
GO

CREATE TABLE role (
  roleId INT PRIMARY KEY,
  roleName VARCHAR(100)
);
GO

CREATE TABLE users (
  userId INT IDENTITY(1,1) PRIMARY KEY,
  userName VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  phoneNum VARCHAR(20),
  password VARCHAR(100),
  roleId INT,
  status VARCHAR(50),
  joinDate DATE,
  FOREIGN KEY (roleId) REFERENCES role(roleId)
);
GO

CREATE TABLE coach_info (
  coachId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  phoneNum VARCHAR(20),
  experience INT,
  available_time VARCHAR(100),
  specialty VARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE badge (
  badgeId INT IDENTITY(1,1) PRIMARY KEY,
  badgeName VARCHAR(100),
  description TEXT,
  condition_type VARCHAR(50),
  value INT
);
GO

CREATE TABLE plan_milestone (
  milestoneId INT IDENTITY(1,1) PRIMARY KEY,
  planId INT NULL,
  badgeId INT,
  title VARCHAR(100),
  description TEXT,
  target_date DATE,
  FOREIGN KEY (badgeId) REFERENCES badge(badgeId)
);
GO

CREATE TABLE smoking_status (
  statusId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  milestoneId INT,
  time_period VARCHAR(50),
  amount_per_day INT,
  frequency VARCHAR(50),
  price_per_pack DECIMAL(10, 2),
  description TEXT,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (milestoneId) REFERENCES plan_milestone(milestoneId)
);
GO

CREATE TABLE quit_plan (
  planId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  coachId INT,
  statusId INT,
  reason TEXT,
  start_date DATE,
  goal_date DATE,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (statusId) REFERENCES smoking_status(statusId)
);
GO

ALTER TABLE plan_milestone
ADD FOREIGN KEY (planId) REFERENCES quit_plan(planId);
GO

CREATE TABLE daily_progress (
  progressId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  note TEXT,
  no_smoking BIT,
  symptoms TEXT,
  date DATE,
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE post (
  postId INT IDENTITY(1,1) PRIMARY KEY,  
  userId INT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  create_date DATETIME NOT NULL,         
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE comment (
  commentId INT IDENTITY(1,1) PRIMARY KEY,
  postId INT,
  userId INT,
  content TEXT,
  created_date DATE,
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
  create_day DATE,
  FOREIGN KEY (postId) REFERENCES post(postId),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (commentId) REFERENCES comment(commentId)
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
  send_date DATE,
  type VARCHAR(50),
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
  time_created DATE,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE membership (
  membershipId INT IDENTITY(1,1) PRIMARY KEY,
  membershipName VARCHAR(100),
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
  pay_date DATE,
  method VARCHAR(50),
  type VARCHAR(50),
  status VARCHAR(50),
  FOREIGN KEY (userId_fk, membershipId_fk) REFERENCES user_memberships(userId, membershipId)
);
GO

CREATE TABLE chat_log (
  chatId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  coachId INT,
  content TEXT,
  type VARCHAR(50),
  status VARCHAR(50),
  chat_date DATE,
  sender VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

CREATE TABLE booking_consultation (
  bookingId INT IDENTITY(1,1) PRIMARY KEY,
  userId INT,
  coachId INT,
  date DATE,
  type VARCHAR(50),
  status VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

CREATE TABLE transaction_money (
  transactionId INT IDENTITY(1,1) PRIMARY KEY,
  memberId INT,
  coachId INT,
  planId INT,
  amount DECIMAL(10, 2),
  status VARCHAR(50),
  method VARCHAR(50),
  transaction_date DATE,
  FOREIGN KEY (memberId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE user_badge (
  userId INT,
  badgeId INT,
  date_awarded DATE,
  PRIMARY KEY (userId, badgeId),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (badgeId) REFERENCES badge(badgeId)
);
GO



INSERT INTO role (roleId, roleName)
VALUES 
(1, 'Guest'),
(2, 'Member'),
(3, 'Coach'),
(4, 'Admin');
GO

INSERT INTO users (userName, age, gender, phoneNum, password, roleId, status, joinDate)
VALUES 
('Nguyen Van A', 25, 'Male', '0901000001', 'guest123', 1, 'Active', '2025-06-01'),
('Tran Van B', 28, 'Female', '0901000002', 'member123', 2, 'Active', '2025-06-02'),
('Pham Thi C', 35, 'Male', '0901000003', 'coach123', 3, 'Active', '2025-06-03'),
('Do cao D', 30, 'Other', '0901000004', 'admin123', 4, 'Active', '2025-06-04');
GO

INSERT INTO coach_info (userId, phoneNum, experience, available_time, specialty)
VALUES (3, '0901000003', 5, 'Weekdays 9am-5pm', 'Smoking Cessation');
GO


