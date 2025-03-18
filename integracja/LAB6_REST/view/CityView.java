package view;

import model.City;

import java.util.List;

public class CityView {

    // Metoda do wyświetlania listy miast
    public void displayCities(List<City> cities) {
        for (City city : cities) {
            System.out.println("City ID: " + city.getId());
            System.out.println("City name: " + city.getName());
            System.out.println("Country Code: " + city.getCountryCode());
            System.out.println("District: " + city.getDistrict());
            System.out.println("City population: " + city.getPopulation());
            System.out.println("--------------------");
        }
    }
}