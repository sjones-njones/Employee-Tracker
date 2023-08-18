Insert INTO department (name)
VALUES  ('Math'),
        ('English'),
        ('Science'),
        ('History'),
        ('Art');

INSERT INTO role (title, salary, department_id)
VALUES  ('Teacher, 36000.00, 1'),
        ('Teacher, 36000.00, 2'),
        ('Teacher, 36000.00, 3'),
        ('Teacher, 36000.00, 4'),
        ('Teacher, 36000.00, 5'),
        ('Teacher Assistant, 26000.00, 3'),('Teacher Assistant, 26000.00, 5'), ('Teacher Assistant, 26000.00, 3');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Stephanie', 'Jones', 1, 1),         
        ('Neil', 'Jones', 2, 2),
        ('Maya', 'Jones', 3, 3), 
        ('Rosie', 'Jones', 4, 4), 
        ('Susan', 'Hodgeson', 5, 5), 
        ('Roy', 'Hodgeson', 6, 6), 
        ('Holden', 'Hodgeson', 7, 7);
