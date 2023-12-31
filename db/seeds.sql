-- data for dept table
Insert INTO department (name)
VALUES  ('Math'),
        ('English'),
        ('Science'),
        ('History'),
        ('Art');

-- data for role table
INSERT INTO role (title, salary, department_id)
VALUES  ('Math Teacher', 36000, 1),
        ('English Teacher', 36000, 2),
        ('Science Teacher', 36000, 3),
        ('History Teacher', 36000, 4),
        ('Art Teacher', 36000, 5),
        ('Science Teacher Assistant', 26000, 3),
        ('Art Teacher Assistant', 26000, 5), 
        ('History Teacher Assistant', 26000, 4);

-- data for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Stephanie', 'Jones', 1, null),         
        (2, 'Neil', 'Jones', 2, 1),
        (3, 'Holden', 'Hodgeson', 7, null),
        (4, 'Maya', 'Jones', 3, 1), 
        (5, 'Susan', 'Hodgeson', 5, 2), 
        (6, 'Roy', 'Hodgeson', 6, 3), 
        (7, 'Rosie', 'Jones', 4, 1);

