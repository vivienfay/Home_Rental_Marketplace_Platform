package com.example.demo.property;

import com.example.demo.property.exception.BadRequestException;
import com.example.demo.property.exception.PropertyNotFoundException;
import com.example.demo.student.Student;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@AllArgsConstructor
@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    public List<Property> getAllProperties(){
        return propertyRepository.findAll();
    }

    public void addProperty(@RequestBody Property property){
//        check if address is taken
        Boolean existsAddress = propertyRepository
                .selectExistsAddress(property.getAddress());
        if (existsAddress){
            throw new BadRequestException(
                    "Email " + property.getAddress() + "taken" );
        }
        propertyRepository.save(property);
    }

    public void deleteProperty(Long propertyId) {
//        check if address exists
        if (!propertyRepository.existsById(propertyId)){
            throw new PropertyNotFoundException(
                    "Property with id " + propertyId +  " does not exists");
        }
        propertyRepository.deleteById(propertyId);
    }
}
