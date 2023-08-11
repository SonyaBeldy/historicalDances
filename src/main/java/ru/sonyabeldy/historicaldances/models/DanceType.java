package ru.sonyabeldy.historicaldances.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "dance_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DanceType {

    @Id
    @Column(name = "id")
    int id;

    @Column(name = "name")
    String name;

}
