package ru.sonyabeldy.historicaldances.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "dance_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DanceType {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "type", fetch = FetchType.EAGER)
    private List<Dance> dances;

}
