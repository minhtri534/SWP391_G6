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
  userId INT PRIMARY KEY,
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

-- Renamed 'plan' to 'quit_plan'
CREATE TABLE quit_plan (
  planId INT PRIMARY KEY,
  userId INT,
  reason TEXT,
  start_date DATE,
  goal_date DATE,
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE milestones (
  milestoneId INT PRIMARY KEY,
  userId INT,
  planId INT,
  title VARCHAR(100),
  description TEXT,
  target_date DATE,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE smoker_status (
  statusId INT PRIMARY KEY,
  userId INT,
  time_period VARCHAR(50),
  milestoneId INT,
  planId INT,
  amount_per_day INT,
  frequency INT,
  price_per_pack DECIMAL(10, 2),
  description TEXT,
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (milestoneId) REFERENCES milestones(milestoneId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO


CREATE TABLE post (
  postId INT PRIMARY KEY,
  userId INT,
  content TEXT,
  create_date DATE,
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE comment (
  commentId INT PRIMARY KEY,
  postId INT,
  userId INT,
  content TEXT,
  created_date DATE,
  FOREIGN KEY (postId) REFERENCES post(postId),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE processing (
  processingId INT PRIMARY KEY,
  milestoneId INT,
  userId INT,
  note TEXT,
  date DATE,
  FOREIGN KEY (milestoneId) REFERENCES milestones(milestoneId),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE Notification_Message (
  notificationId INT PRIMARY KEY,
  userId INT,
  message TEXT,
  send_date DATE,
  type VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE badge (
  badgeId INT PRIMARY KEY,
  badgeName VARCHAR(100),
  description TEXT,
  condition_type VARCHAR(50),
  value INT
);
GO

CREATE TABLE user_plan_badge (
  userId INT,
  badgeId INT,
  planId INT,
  date_get DATE,
  PRIMARY KEY (userId, badgeId, planId),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (badgeId) REFERENCES badge(badgeId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE payment (
  paymentId INT PRIMARY KEY,
  userId INT,
  amount DECIMAL(10, 2),
  pay_date DATE,
  method VARCHAR(50),
  type VARCHAR(50),
  status VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE membership (
  membershipId INT PRIMARY KEY,
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

CREATE TABLE coach_info (
  coachId INT PRIMARY KEY,
  userId INT,
  phoneNum VARCHAR(20),
  experience INT,
  available_time VARCHAR(100),
  specialty VARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE feedback (
  feedbackId INT PRIMARY KEY,
  userId INT,
  coachId INT,
  planId INT,
  content TEXT,
  rating INT,
  time_created DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId),
  FOREIGN KEY (planId) REFERENCES quit_plan(planId)
);
GO

CREATE TABLE log (
  logId INT PRIMARY KEY,
  userId INT,
  date DATE,
  no_smoking INT,
  symptoms TEXT,
  money_saved DECIMAL(10, 2),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
GO

CREATE TABLE chat_log (
  chatId INT PRIMARY KEY,
  userId INT,
  coachId INT,
  content TEXT,
  type VARCHAR(50),
  status VARCHAR(50),
  chat_date DATETIME DEFAULT GETDATE(),
  sender VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

CREATE TABLE booking (
  bookingId INT PRIMARY KEY,
  userId INT,
  coachId INT,
  date DATETIME DEFAULT GETDATE(),
  type VARCHAR(50),
  status VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (coachId) REFERENCES coach_info(coachId)
);
GO

INSERT INTO role (roleId, roleName) VALUES
(1, 'Guest'),
(2, 'Member'),
(3, 'Coach'),
(4, 'Admin')
;
GO


INSERT INTO users (userId, userName, age, gender, phoneNum, password, roleId, status, joinDate) VALUES
(1, 'Alice', 28, 'Female', '1234567890', '1', 1, 'active', '2024-05-01'),
(2, 'Bob', 35, 'Male', '2345678901', '1', 3, 'active', '2024-06-01'),
(3, 'Charlie', 22, 'Male', '3456789012', '1', 4, 'inactive', '2023-12-15'),
(4, 'Diana', 30, 'Female', '4567890123', '1', 2, 'active', '2024-01-10'),
(5, 'Eve', 40, 'Female', '5678901234', '1', 1, 'banned', '2024-03-25');
GO

INSERT INTO quit_plan (planId, userId, reason, start_date, goal_date) VALUES
(1, 1, 'Health improvement', '2024-05-10', '2024-11-10'),
(2, 3, 'Save money', '2024-06-01', '2024-12-01'),
(3, 5, 'Better fitness', '2024-04-20', '2024-10-20'),
(4, 1, 'Quit completely', '2024-07-01', '2025-01-01'),
(5, 2, 'Coach-led goal', '2024-05-15', '2024-11-15');
GO

INSERT INTO milestones (milestoneId, userId, planId, title, description, target_date) VALUES
(1, 1, 1, 'First week', 'Stay smoke-free for 7 days', '2024-05-17'),
(2, 3, 2, 'One pack less', 'Reduce by one pack per day', '2024-06-15'),
(3, 5, 3, 'Half intake', 'Cut smoking by half', '2024-05-20'),
(4, 1, 4, 'One month clean', 'No smoking for a month', '2024-08-01'),
(5, 2, 5, 'Coach goal', 'Complete coach-assigned target', '2024-06-30');
GO

INSERT INTO smoker_status (statusId, userId, time_period, milestoneId, planId, amount_per_day, frequency, price_per_pack, description) VALUES
(1, 1, 'Week 1', 1, 1, 10, 5, 2.50, 'Initial tracking'),
(2, 3, 'Week 2', 2, 2, 8, 4, 2.50, 'Reduced by 2'),
(3, 5, 'Week 1', 3, 3, 15, 6, 3.00, 'High initial rate'),
(4, 1, 'Week 4', 4, 4, 5, 2, 2.00, 'Major improvement'),
(5, 2, 'Week 3', 5, 5, 12, 5, 3.00, 'Coach advised plan');
GO

INSERT INTO post (postId, userId, content, create_date) VALUES
(1, 1, 'Today is my first smoke-free day!', '2024-05-10'),
(2, 3, 'Struggling a bit, but staying strong.', '2024-06-03'),
(3, 5, 'Cut down to half my usual intake!', '2024-05-21'),
(4, 2, 'Proud of my client’s progress!', '2024-06-05'),
(5, 1, 'One week milestone completed!', '2024-05-17');
GO

INSERT INTO comment (commentId, postId, userId, content, created_date) VALUES
(1, 1, 3, 'Keep it up!', '2024-05-10'),
(2, 2, 1, 'You got this!', '2024-06-03'),
(3, 3, 2, 'Great work!', '2024-05-21'),
(4, 4, 5, 'Thanks coach!', '2024-06-05'),
(5, 5, 4, 'Excellent progress!', '2024-05-17');
GO

INSERT INTO processing (processingId, milestoneId, userId, note, date) VALUES
(1, 1, 1, 'Smoked only 5 today.', '2024-05-11'),
(2, 2, 3, 'Reduced by 1 pack.', '2024-06-04'),
(3, 3, 5, 'Tracking intake.', '2024-05-22'),
(4, 4, 1, 'No smoking today.', '2024-07-15'),
(5, 5, 2, 'Coach checked in.', '2024-06-10');
GO

INSERT INTO Notification_Message (notificationId, userId, message, send_date, type) VALUES
(1, 1, 'Your milestone is due tomorrow!', '2024-05-16', 'Reminder'),
(2, 3, 'Plan updated by system.', '2024-06-02', 'System'),
(3, 5, 'You earned a badge!', '2024-05-22', 'Achievement'),
(4, 2, 'New feedback received.', '2024-06-06', 'Info'),
(5, 1, 'Plan review scheduled.', '2024-07-01', 'Reminder');
GO

INSERT INTO badge (badgeId, badgeName, description, condition_type, value) VALUES
(1, '1 Week Smoke-Free', 'Completed one week without smoking.', 'days_no_smoke', 7),
(2, 'Cut Down 50%', 'Reduced smoking by half.', 'reduction_percent', 50),
(3, 'Logged Daily', 'Logged progress for 7 consecutive days.', 'daily_log', 7),
(4, 'Feedback Star', 'Received 5-star rating from coach.', 'rating', 5),
(5, 'First Plan Complete', 'Completed your first quit plan.', 'plans_completed', 1);
GO

INSERT INTO user_plan_badge (userId, badgeId, planId, date_get) VALUES
(1, 1, 1, '2024-05-17'),
(3, 2, 2, '2024-06-15'),
(5, 3, 3, '2024-05-28'),
(1, 5, 4, '2024-07-01'),
(2, 4, 5, '2024-06-25');
GO


INSERT INTO payment (paymentId, userId, amount, pay_date, method, type, status) VALUES
(1, 1, 29.99, '2024-05-01', 'Credit Card', 'Membership', 'Completed'),
(2, 3, 19.99, '2024-06-01', 'PayPal', 'Coaching', 'Completed'),
(3, 5, 9.99, '2024-04-20', 'Credit Card', 'Tracking', 'Completed'),
(4, 2, 29.99, '2024-05-15', 'Bank Transfer', 'Membership', 'Pending'),
(5, 1, 10.00, '2024-07-01', 'Cash', 'Donation', 'Completed');
GO

INSERT INTO membership (membershipId, membershipName, price, duration) VALUES
(1, 'Basic', 9.99, 30),
(2, 'Standard', 19.99, 60),
(3, 'Premium', 29.99, 90),
(4, 'Annual', 99.99, 365),
(5, 'Coach Package', 49.99, 90);
GO

INSERT INTO user_memberships (userId, membershipId, start_date, end_date) VALUES
(1, 3, '2024-05-01', '2024-07-30'),
(3, 1, '2024-06-01', '2024-07-01'),
(5, 2, '2024-04-20', '2024-06-19'),
(2, 5, '2024-05-15', '2024-08-13'),
(1, 4, '2024-07-01', '2025-07-01');
GO

INSERT INTO coach_info (coachId, userId, phoneNum, experience, available_time, specialty) VALUES
(1, 2, '2345678901', 5, 'Weekdays 9-5', 'Motivational Coaching');
GO

INSERT INTO feedback (feedbackId, userId, coachId, planId, content, rating) VALUES
(1, 1, 1, 1, 'Great support and motivation throughout the plan.', 5),
(2, 3, 1, 2, 'Helpful tips and advice.', 4),
(3, 5, 1, 3, 'Coach was very supportive.', 5);
GO

INSERT INTO log (logId, userId, date, no_smoking, symptoms, money_saved) VALUES
(1, 1, '2024-05-10', 1, 'Mild cravings', 2.50),
(2, 3, '2024-06-03', 0, 'Anxiety', 0.00),
(3, 5, '2024-05-21', 1, 'Irritability', 3.00),
(4, 1, '2024-05-11', 1, 'Improved focus', 5.00),
(5, 2, '2024-06-10', 1, 'None', 2.00);
GO

INSERT INTO chat_log (chatId, userId, coachId, content, type, status, sender) VALUES
(4, 2, 1, 'Reminder: session tomorrow.', 'Text', 'Read', 'Coach'),
(5, 5, 1, 'Logged progress today.', 'Text', 'Delivered', 'User');
GO

INSERT INTO booking (bookingId, userId, coachId, type, status) VALUES
(2, 3, 1, 'Follow-up', 'Pending'),
(3, 5, 1, 'Check-in', 'Completed')
;
GO

