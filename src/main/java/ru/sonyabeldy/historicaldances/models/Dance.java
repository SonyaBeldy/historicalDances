package ru.sonyabeldy.historicaldances.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Dance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "dance_type_id", referencedColumnName = "id")
    private DanceType owner;

    @Column(name = "description")
    private String description;

}
