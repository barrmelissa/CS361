/*Team project
CS 361-400-F18
TeachMe Project
11/26/18
*/

DROP TABLE IF EXISTS  `user_classes`;
DROP TABLE IF EXISTS `users_teachme`;
DROP TABLE IF EXISTS `class_teachme`;


CREATE TABLE `users_teachme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `student` boolean NOT NULL,
  `teacher` boolean NOT NULL,
  `bio` varchar(500),
  `edu` varchar(5),
  -- `class_id` int(11) DEFAULT NULL,	
  PRIMARY KEY (`id`),
  -- KEY `class_id` (`class_id`),
  CONSTRAINT `users_teachme_uq1` UNIQUE (`email`)
  -- CONSTRAINT `users_class_id_fk` FOREIGN KEY (`class_id`) REFERENCES `class_teachme`(`id`) ON DELETE SET NULL ON UPDATE CASCADE  
) ENGINE=InnoDB;

CREATE TABLE `class_teachme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `classTime` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `expectations` varchar(500) NOT NULL,
  `prerequisites` varchar(500) NOT NULL,
  `location` varchar(255) NOT NULL,
  `syllabus` varchar(500),
  `rating` varchar(500),
  `main_image` varchar(500),
  `class_page` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO users_teachme (fname, lname, dob, password, email, student, teacher, bio, edu) VALUES 
                     ('John', 'Smith', DATE '1995-04-15', 'jspass', 'js@thismail.com', 1, 1, 'I love to learn.', 'pr'),
                     ('Sandra', 'Delgado', DATE '1989-09-19', 'sdpass', 'sd89@thismail.com', 0, 1, 'I love to learn.', 'ba'),
                     ('Michael', 'Dontell', DATE '1975-10-10', 'mdpass', 'mdd@thismail.com', 1, 0, 'I love to learn.', 'hs'),
                     ('Gilbert', 'Cohen', DATE '1983-06-06', 'gcpass', 'gilcoh@thismail.com', 1, 1, 'I love to learn.', 'pr'),
                     ('Sarah', 'Jenson', DATE '1997-08-28', 'sjpass', 'sarah@thismail.com', 0, 1, 'I love to learn.', 'ma'),
                     ('Gregory', 'Connor', DATE '1963-12-15', 'gcpass', 'gc63@thismail.com', 0, 1, 'I love to learn.', 'ba'),
                     ('Jorge', 'Gonzalez', DATE '1987-01-19', 'jgpass', 'gonza19@thismail.com', 1, 1, 'I love to learn.', 'ma'),
                     ('Steven', 'Everett', DATE '1999-07-29', 'sepass', 'sevv@thismail.com', 1, 0, 'I love to learn.', 'ms'),
                     ('Ana', 'Emerson', DATE '1998-05-15', 'aepass', 'anae@thismail.com', 1, 0, 'I love to learn.', 'sc');

INSERT INTO class_teachme (name, classTime, description, expectations, prerequisites, location, syllabus, rating, main_image, class_page) VALUES 
            ('Bread Making', 
					   'Wednesday, 7:00 - 8:00 pm PST', 
					   'Learn how to bake your own breads! We cover the art of wheat and rye breads. YUM!', 
					   '1. Be on time to class. 2. Willing to learn. 3. Have fun!', 
					   '1. Novice cooking skills. 2. Access to a oven. 3. Access to Ancient Grains.', 
					   'Online', 
					   'We will cover the basics of cooking bread. The class will meet at re-occurring times every week. The bread making process for wheat and rye breads will be covered from start to finish.', 
					   '5.0', 
             'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1fbf80910cefb7361c4ddeb28a3493a2&auto=format&fit=crop&w=1950&q=80',
             'http://flip2.engr.oregonstate.edu:4455/bread_course'),
            ('Woodworking',
             'Saturday, 3:00 - 4:00 pm PST',
             'Learn the art of working with wood!',
             'Complete a wood-based project to earn your basic wood certification.',
             '1. Must provide your own tools. 2. Access to old-growth pine of a high quality.',
             'In Person - 123 Fake St, Corvallis, OR 99999',
             'Syllabus To Be Provided',
             '4.87',
             'https://images.unsplash.com/photo-1497219055242-93359eeed651?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e93919e7b1cafa1b168d2676ccb97b04&auto=format&fit=crop&w=2491&q=80',
             'http://flip2.engr.oregonstate.edu:4455/wood_course'),
            ('Web Development with Node JS',
             'User Paced',
             'Get in the Web Development game today!  Learn all that NodeJS has to offer.',
             'Create a demonstration page with Node to complete the course',
             'Basic HTML/CSS and quantum computing familiarity is all that is required',
             'Online',
             'Syllabus To Be Provided',
             '4.67',
             'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a20bc6324f6ef2969d9a7cae56b8d4d1&auto=format&fit=crop&w=1950&q=80',
             'http://flip2.engr.oregonstate.edu:4455/node_course');

CREATE TABLE `user_classes`(
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY(`uid`, `cid`),
  CONSTRAINT `user_classes_id_fk1` FOREIGN KEY (`uid`) REFERENCES `users_teachme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_classes_id_fk2` FOREIGN KEY (`cid`) REFERENCES `class_teachme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

INSERT INTO user_classes (uid, cid) VALUES (1, 1), (1, 2);
