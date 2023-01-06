CREATE DATABASE IF NOT EXISTS `mealdecider` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `mealdecider`;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `user_username` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_salt` varchar(100) NOT NULL,
  `user_avatar` varchar(150) DEFAULT NULL,
  `user_favorites` varchar(200), /* As a string for now? Initialized with user creation and updated */
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `recipe` (
    `recipe_id` int not null AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL, /** User who creates recipe, may not be needed? */
    `recipe_name` varchar(100) NOT NULL,
    `recipe_description` varchar(500),
    `recipe_img` varchar(150),
    `recipe_hours` int,
    `recipe_minutes` int,
    `recipe_difficulty` int,
    `recipe_ingredients` varchar(2000), /* As a string for now? */
    `recipe_directions` varchar(8000), /* As a string for now? */
    PRIMARY KEY (`recipe_id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `user`;
INSERT INTO `user` (`user_id`, `user_first_name`, `user_last_name`, `user_username`, `user_password`, `user_salt`, `user_avatar`, `user_favorites`) VALUES
	(1, 'Stu', 'Dent', 'student', 'student', '', '', '1,.,2'),
	(2, 'Gra', 'Duate', 'graduate', 'graduate', '', '', '2');

DELETE FROM `recipe`;
INSERT INTO `recipe` (`recipe_id`, `user_id`, `recipe_name`, `recipe_description`, `recipe_img`, `recipe_hours`, `recipe_minutes`, `recipe_difficulty`, `recipe_ingredients`, `recipe_directions`) VALUES
  (1, 2, 'dumplings', 'delicious dumplings', '', 1, 15, 2, '1 lbs pork,.,3 tablespoon chopped chinese chives,.,50 dumpling wrappers,.,2 tablespoon minced garlic', 'take dumplings,.,make them'),
  (2, 1, 'Ragu', 'yummy ragu', '', 0, 45, 1, '1 lbs spaghetti,.,1 lbs ground meat,.,sauce', 'take ragu,.,make it');