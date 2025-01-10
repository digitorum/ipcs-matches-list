CREATE USER 'local_dev'@'localhost' IDENTIFIED BY 'qwerty1234';
CREATE DATABASE ipsc_matches_list;
GRANT ALL ON `prisma\_migrate\_shadow\_db\_%`.* TO 'local_dev'@'localhost';
GRANT ALL ON ipsc_matches_list.* TO 'local_dev'@'localhost';
FLUSH PRIVILEGES;
