package ru.sonyabeldy.historicaldances.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "dance_form_dance_list")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DanceFromDanceList {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "list_id", referencedColumnName = "id")
    private DanceList owner;

    @ManyToMany
    @JoinColumn(name = "")
    private Dance dance;

}

