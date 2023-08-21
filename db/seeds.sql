Insert INTO department (name)
VALUES  ('Math'),
        ('English'),
        ('Science'),
        ('History'),
        ('Art');

INSERT INTO role (title, salary, department_id)
VALUES  ('Teacher', 36,000.00, 1),
        ('Teacher', 36,000.00, 2),
        ('Teacher', 36,000.00, 3),
        ('Teacher', 36,000.00, 4),
        ('Teacher', 36,000.00, 5),
        ('Teacher Assistant', 26,000.00, 3),
        ('Teacher Assistant', 26,000.00, 5), 
        ('Teacher Assistant', 26,000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Stephanie', 'Jones', 1, null ),         
        ('Neil', 'Jones', 2, 1),
        ('Maya', 'Jones', 3, 1), 
        ('Rosie', 'Jones', 4, 7), 
        ('Susan', 'Hodgeson', 5, 5), 
        ('Roy', 'Hodgeson', 6, 6), 
        ('Holden', 'Hodgeson', 7, null);
