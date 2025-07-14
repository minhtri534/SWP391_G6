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
  userId INT NULL,       
  coachId INT NULL,     
  statusId INT NULL,     
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
  bookingId INT, 
  amount DECIMAL(10, 2),
  status VARCHAR(50),
  method VARCHAR(50),
  transaction_date DATE,
  FOREIGN KEY (memberId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId),
  FOREIGN KEY (bookingId) REFERENCES booking_consultation(bookingId) 
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

-- USERS
INSERT INTO users (userName, age, gender, phoneNum, password, roleId, status, joinDate)
VALUES 
('Nguyen Van A', 25, 'Male', '0901000001', 'guest123', 1, 'Active', '2025-06-01'),
('Tran Van B', 28, 'Female', '0901000002', 'member123', 2, 'Active', '2025-06-02'),
('Pham Thi C', 35, 'Male', '0901000003', 'coach123', 3, 'Active', '2025-06-03'),
('Do Cao D', 30, 'Other', '0901000004', 'admin123', 4, 'Active', '2025-06-04');
GO

-- COACH
INSERT INTO coach_info (userId, phoneNum, experience, available_time, specialty)
VALUES 
(3, '0901000003', 5, 'Weekdays 9am-5pm', 'Smoking Cessation');
GO

-- BADGES
INSERT INTO badge (badgeName, description, condition_type, value)
VALUES 
('First Day Smoke-Free', 'Completed first day without smoking', 'DayStreak', 1),
('One Week Hero', 'Stayed smoke-free for a week', 'DayStreak', 7);
GO


INSERT INTO smoking_status (userId, milestoneId, time_period, amount_per_day, frequency, price_per_pack, description)
VALUES 
(2, NULL, 'Morning', 5, 'Daily', 20.5, 'Heavy smoker in morning'),
(2, NULL, 'Evening', 3, 'Daily', 18.0, 'Light smoker in evening'),
(3, NULL, 'Whole Day', 10, 'Hourly', 22.5, 'Chain smoker'),
(2, NULL, 'Weekend', 4, 'Weekly', 19.9, 'Only smokes socially');
GO

INSERT INTO quit_plan (userId, coachId, statusId, reason, start_date, goal_date)
VALUES
(NULL, NULL, 1, 'Health improvement', '2025-07-01', '2025-08-01'),
(NULL, NULL, 2, 'Family concern', '2025-07-02', '2025-08-15'),
(NULL, NULL, 3, 'Financial savings', '2025-07-03', '2025-09-01'),
(NULL, NULL, 4, 'Doctor recommendation', '2025-07-04', '2025-09-15');
GO


INSERT INTO plan_milestone (planId, badgeId, title, description, target_date)
VALUES
(1, 1, 'Day 1 Milestone', 'Complete first day without smoking', '2025-07-02'),
(1, 2, 'Week 1 Goal', 'Remain smoke-free for one week', '2025-07-08'),
(2, 1, 'Initial Milestone', 'Survive the first day', '2025-07-03'),
(3, 2, '7-Day Challenge', 'Seven smoke-free days', '2025-07-10'),
(4, 1, 'Doctor’s First Goal', 'Start smoke-free life', '2025-07-05');
GO

INSERT INTO daily_progress (userId, note, no_smoking, symptoms, date)
VALUES
(2, 'Feeling good, minor cravings', 1, 'Mild headache', '2025-07-01'),
(2, 'Craving after lunch', 0, 'Moderate craving', '2025-07-02');
GO

INSERT INTO feedback (userId, coachId, planId, content, rating, time_created)
VALUES
(2, 1, 1, 'Coach was very supportive.', 5, '2025-07-02'),
(3, 1, 4, 'Need more guidance on cravings.', 3, '2025-07-03');
GO

INSERT INTO membership (membershipName, price, duration)
VALUES
('Standard Plan', 49.99, 30),
('Premium Plan', 89.99, 60);
GO

INSERT INTO user_memberships (userId, membershipId, start_date, end_date)
VALUES
(2, 1, '2025-07-01', '2025-07-31'),
(3, 2, '2025-07-01', '2025-08-30');
GO

INSERT INTO payment (userId_fk, membershipId_fk, amount, pay_date, method, type, status)
VALUES
(2, 1, 49.99, '2025-07-01', 'Credit Card', 'One-time', 'Completed'),
(3, 2, 89.99, '2025-07-01', 'PayPal', 'Recurring', 'Completed');
GO

INSERT INTO user_badge (userId, badgeId, date_awarded)
VALUES
(2, 1, '2025-07-02'),
(2, 2, '2025-07-08');
GO

INSERT INTO chat_log (userId, coachId, content, type, status, chat_date, sender)
VALUES
(2, 1, 'Hi Coach, I need help!', 'Text', 'Sent', '2025-07-02', 'Member'),
(1, 1, 'Sure, let’s schedule a call.', 'Text', 'Replied', '2025-07-02', 'Coach');
GO

INSERT INTO booking_consultation (userId, coachId, date, type, status)
VALUES
(2, 1, '2025-07-05', 'Call', 'Confirmed'),
(3, 1, '2025-07-06', 'In-person', 'Pending');
GO

INSERT INTO post (userId, title, content, create_date)
VALUES
(2, 'My Quit Journey', 'Today is my first day trying to quit smoking!', '2025-07-01'),
(3, 'Tips Needed', 'Having a hard time resisting the urge. Any tips?', '2025-07-02');
GO

INSERT INTO comment (postId, userId, content, created_date)
VALUES
(1, 3, 'Stay strong! You can do this!', '2025-07-01'),
(2, 2, 'Try chewing gum or drinking water when cravings hit.', '2025-07-02');
GO

INSERT INTO report (content, postId, userId, commentId, create_day)
VALUES
('This post contains misleading information.', 2, 2, NULL, '2025-07-03'),
('Comment seems offensive.', NULL, 3, 1, '2025-07-03');
GO

INSERT INTO coach_plan_badge (coachId, badgeId, planId, date_get)
VALUES
(1, 1, 1, '2025-07-03'),
(1, 2, 2, '2025-07-09');
GO

INSERT INTO notification (userId, relatedLogId, relatedMilestoneId, message, send_date, type)
VALUES
(2, 1, 1, 'Congratulations! You completed your first smoke-free day.', '2025-07-02', 'Milestone'),
(2, NULL, NULL, 'Reminder: Your consultation is tomorrow.', '2025-07-04', 'Reminder');
GO


INSERT INTO transaction_money (memberId, coachId, planId, amount, status, method, transaction_date)
VALUES
(2, 1, 1, 29.99, 'Completed', 'Bank Transfer', '2025-07-02'),
(3, 1, 4, 49.99, 'Pending', 'Credit Card', '2025-07-03');
GO

