import model.City;
import service.CityService;
import view.CityView;

import java.util.List;

public class Main2 {
    public static void main(String[] args) {
        // Adres URL API
        String apiUrl = "http://localhost/IS_LAB6_REST/cities/read/10";

        // Pobieranie danych
        CityService cityService = new CityService();
        List<City> cities = cityService.fetchCities(apiUrl);

        // Wyświetlanie danych
        CityView cityView = new CityView();
        cityView.displayCities(cities);
    }
}