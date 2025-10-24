package com.example.studentmanagement.controller;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.services.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("students")
@Tag(name = "Student Management", description = "APIs for managing students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/save")
    @Operation(summary = "Save a student", description = "Create a new student record")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Student created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<Student> save(@RequestBody Student student) {
        Student savedStudent = studentService.save(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete a student", description = "Delete a student by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Student deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Student not found")
    })
    public ResponseEntity<Void> delete(@Parameter(description = "Student ID") @PathVariable("id") int id) {
        boolean deleted = studentService.delete(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    @Operation(summary = "Get all students", description = "Retrieve all student records")
    @ApiResponse(responseCode = "200", description = "Students retrieved successfully")
    public ResponseEntity<List<Student>> findAll() {
        List<Student> students = studentService.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/count")
    @Operation(summary = "Count students", description = "Get the total number of students")
    @ApiResponse(responseCode = "200", description = "Student count retrieved successfully")
    public ResponseEntity<Long> countStudent() {
        long count = studentService.countStudents();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/byYear")
    @Operation(summary = "Get students by year", description = "Get number of students grouped by year")
    @ApiResponse(responseCode = "200", description = "Students by year retrieved successfully")
    public ResponseEntity<Collection<?>> findByYear() {
        Collection<?> studentsByYear = studentService.findNbrStudentByYear();
        return new ResponseEntity<>(studentsByYear, HttpStatus.OK);
    }
}

