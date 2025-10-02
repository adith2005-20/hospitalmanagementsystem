import { Request, Response } from "express";
import {sql} from "../../config/db";

export const addDoctor = async (req: Request, res: Response) => {
    const { salary, date_of_joining, specialty, medical_license_no } = req.body;

    if (!salary || !date_of_joining || !specialty || !medical_license_no) {
        return res.status(400).json({ message: "Missing required fields for adding a doctor." });
    }

    try {
        await sql`BEGIN`;
        
        const [employee] = await sql`
            INSERT INTO EMPLOYEE (salary, date_of_joining)
            VALUES (${salary}, ${date_of_joining})
            RETURNING emp_id
        `;

        const [doctor] = await sql`
            INSERT INTO DOCTOR (emp_id, specialty, medical_license_no)
            VALUES (${employee.emp_id}, ${specialty}, ${medical_license_no})
            RETURNING *
        `;

        await sql`COMMIT`;

        const newDoctor = { ...employee, ...doctor };
        res.status(201).json({ message: "Doctor added successfully", data: newDoctor });

    } catch (error) {
        await sql`ROLLBACK`;
        
        console.error("Error adding doctor:", error);
        res.status(500).json({ message: "Failed to add doctor", error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const addNurse = async (req: Request, res: Response) => {
    const { salary, date_of_joining, shift_assigned } = req.body;

    if (!salary || !date_of_joining || !shift_assigned) {
        return res.status(400).json({ message: "Missing required fields for adding a nurse." });
    }

    try {
        await sql`BEGIN`;
        
        const [employee] = await sql`
            INSERT INTO EMPLOYEE (salary, date_of_joining)
            VALUES (${salary}, ${date_of_joining})
            RETURNING emp_id
        `;

        const [nurse] = await sql`
            INSERT INTO NURSE (emp_id, shift_assigned)
            VALUES (${employee.emp_id}, ${shift_assigned})
            RETURNING *
        `;
        
        await sql`COMMIT`;

        const newNurse = {...employee, ...nurse};
        res.status(201).json({ message: "Nurse added successfully", data: newNurse });

    } catch (error) {
        await sql`ROLLBACK`;
        console.error("Error adding nurse:", error);
        res.status(500).json({ message: "Failed to add nurse", error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await sql`SELECT * FROM EMPLOYEE ORDER BY emp_id ASC`;
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Failed to fetch employees", error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [employee] = await sql`SELECT * FROM EMPLOYEE WHERE emp_id = ${id}`;
        
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);

    } catch (error) {
        console.error(`Error fetching employee with id ${id}:`, error);
        res.status(500).json({ message: "Failed to fetch employee", error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

