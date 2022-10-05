INSERT INTO departments (name)
VALUES 
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Accountant', 125000, 2),
    ('Lawyer', 190000, 3),
    ('Lead Engineer', 150000, 1),
    ('Legal Team Lead', 250000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4),
    ('Software Engineer', 120000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ashley', 'Rodriguez', 3, null),
    ('Kevin', 'Tupik', 7, 1),
    ('John', 'Doe', 5, 1),
    ('Mike', 'Chan', 6, 3),
    ('Christian', 'Eckenrode', 3, 4),
    ('Sarah', 'Lourd', 4, null),
    ('Tom', 'Allen', 2, 6),
    ('Malia', 'Brown', 1, null);