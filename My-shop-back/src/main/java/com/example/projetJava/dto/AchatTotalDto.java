package com.example.projetJava.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AchatTotalDto {
    private double total;
    private LocalDate date;
}
