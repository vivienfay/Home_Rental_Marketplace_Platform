package com.example.demo.property;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Property {
    @Id
    @SequenceGenerator(
            name = "property_sequence",
            sequenceName = "property_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "property_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = false)
    private Double price;
    @Column(nullable = false)
    private String host;
    @NotBlank
    @Column(nullable = false, unique = true)
    private String address;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType type;

    public Property(Double price, String host, String address, PropertyType type) {
        this.price = price;
        this.host = host;
        this.address = address;
        this.type = type;
    }
}