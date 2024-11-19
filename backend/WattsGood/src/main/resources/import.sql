INSERT INTO City (name) VALUES('Beograd'),('Bor'),('Valjevo'),('Vranje'),('Vršac'),('Zaječar'),('Zrenjanin'),('Jagodina'),('Kikinda'),('Kragujevac'),('Kraljevo'),('Kruševac'),('Leskovac'),('Loznica'),('Niš'),('Novi Pazar'),('Novi Sad'),('Pančevo'),('Pirot'),('Požarevac'),('Priština'),('Prokuplje'),('Smederevo'),('Sombor'),('Sremska Mitrovica'),('Subotica'),('Užice'),('Čačak'),('Šabac');
-- Insert into users table
INSERT INTO "users" (active, blocked, role, city, country, email, name, password, phone, street, surname) VALUES (true, false, 1, 'New York', 'USA', 'owner@example.com', 'John', 'hashed_password', '1234567890', '5th Avenue', 'Doe');

-- Insert into property table
INSERT INTO property (latitude, longitude, number_of_floors, request_status, city_id, completion_date, "owner_id", submission_date, address) VALUES (40.7128, -74.0060, 10, 1, 1, '2024-01-01 12:00:00', 1, '2023-12-01 12:00:00', '100 Main Street');

-- Insert into household table
INSERT INTO household (floor_number, is_active, square_meters, apartment_number, last_heartbeat_timestamp, "owner_id", property_id) VALUES (1, false, 50, 101, 1700000000, 1, 1),(1, false, 60, 102, 1700000000, 1, 1),(2, false, 55, 201, 1700000000, 1, 1),(2, false, 70, 202, 1700000000, 1, 1),(3, false, 65, 301, 1700000000, 1, 1),(3, false, 80, 302, 1700000000, 1, 1),(4, false, 75, 401, 1700000000, 1, 1), (4, false, 90, 402, 1700000000, 1, 1),(5, false, 85, 501, 1700000000, 1, 1),(5, false, 100, 502, 1700000000, 1, 1);
