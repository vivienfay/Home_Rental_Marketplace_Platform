package com.example.demo.property;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/properties")
@AllArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    @GetMapping
    public  List<Property> getAllProperty(){
        return propertyService.getAllProperties();
    }

    @RequestMapping
    public void addProperty(@Valid @RequestBody Property property) {propertyService.addProperty(property);}

    @DeleteMapping(path="{propertyId}")
    public void deleteProperty(@PathVariable("propertyId") Long propertyId){
        propertyService.deleteProperty(propertyId);
    }
}
