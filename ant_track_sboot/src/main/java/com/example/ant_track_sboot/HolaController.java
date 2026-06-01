package com.example.ant_track_sboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {
@GetMapping("/saludo")
public String hola(){
    return "hola";
}
    
}
