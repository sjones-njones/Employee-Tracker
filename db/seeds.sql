Insert INTO department (name)
VALUES  ('Math'),
        ('English'),
        ('Science'),
        ('History'),
        ('Art');

INSERT INTO role (title, salary, department_id)
VALUES  ('Teacher', 36000, 1),
        ('Teacher', 36000, 2),
        ('Teacher', 36000, 3),
        ('Teacher', 36000, 4),
        ('Teacher', 36000, 5),
        ('Teacher Assistant', 26000, 3),
        ('Teacher Assistant', 26000, 5), 
        ('Teacher Assistant', 26000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Stephanie', 'Jones', 1, null),         
        (2, 'Neil', 'Jones', 2, 1),
        (3, 'Holden', 'Hodgeson', 7, null),
        (4, 'Maya', 'Jones', 3, 1), 
        (5, 'Susan', 'Hodgeson', 5, 2), 
        (6, 'Roy', 'Hodgeson', 6, 3), 
        (7, 'Rosie', 'Jones', 4, 1);

