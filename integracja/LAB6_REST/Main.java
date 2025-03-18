import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        try {
            // Test działania lokalnego REST API
            String temp_url = "http://localhost/IS_LAB6_REST/cities/read/10"; 
            URL url = new URL(temp_url);
            System.out.println("Wysyłanie zapytania...");
            InputStream is = url.openStream();
            System.out.println("Pobieranie odpowiedzi...");
            String source = new BufferedReader(new InputStreamReader(is))
                    .lines().collect(Collectors.joining("\n"));
            System.out.println("Przetwarzanie danych...");
            JSONObject json = new JSONObject(source);
            JSONArray recieveddata = (JSONArray) json.get("cities");
            
            for (int i = 0; i < recieveddata.length(); i++) {
                JSONObject city = recieveddata.getJSONObject(i);
                System.out.println("City ID: " + city.get("ID"));
                System.out.println("City name: " + city.get("Name"));
                System.out.println("Country Code: " + city.get("CountryCode"));
                System.out.println("District: " + city.get("District"));
                System.out.println("City population: " + city.get("Population"));
            }
        } catch (Exception e) {
            System.err.println("Wystąpił nieoczekiwany błąd!!! ");
            e.printStackTrace(System.err);
        }
    }
}