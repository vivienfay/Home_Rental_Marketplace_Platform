package com.example.demo.property;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository
        extends JpaRepository<Property, Long> {
    @Query("" +
            "SELECT CASE WHEN COUNT(p) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Property p " +
            "WHERE p.address = ?1"
    )
    Boolean selectExistsAddress(String address);
}
