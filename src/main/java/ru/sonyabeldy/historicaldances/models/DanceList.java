package ru.sonyabeldy.historicaldances.models;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "dance_list")
public class DanceList {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private Timestamp date;
}
