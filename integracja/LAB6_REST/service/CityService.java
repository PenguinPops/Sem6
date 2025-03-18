package service;

import model.City;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CityService {

    // Metoda do pobierania danych z API
    public List<City> fetchCities(String apiUrl) {
        List<City> cities = new ArrayList<>();

        try {
            URL url = new URL(apiUrl);
            InputStream is = url.openStream();
            String source = new BufferedReader(new InputStreamReader(is))
                    .lines().collect(Collectors.joining("\n"));
            JSONObject json = new JSONObject(source);
            JSONArray receivedData = json.getJSONArray("cities");

            // Przetwarzanie danych JSON na obiekty City
            for (int i = 0; i < receivedData.length(); i++) {
                JSONObject cityJson = receivedData.getJSONObject(i);
                int id = cityJson.getInt("ID");
                String name = cityJson.getString("Name");
                String countryCode = cityJson.getString("CountryCode");
                String district = cityJson.getString("District");
                int population = cityJson.getInt("Population");

                City city = new City(id, name, countryCode, district, population);
                cities.add(city);
            }
        } catch (Exception e) {
            System.err.println("Wystąpił błąd podczas pobierania danych: ");
            e.printStackTrace(System.err);
        }

        return cities;
    }
}