https://andrzejsenderecki.github.io/F1stats_REACT_SASS_RWD/

Projekt F1stats! przedstawia statystyki z wyścigów Formuły 1 na bazie danych udostępnionych przez Ergast API. Użytkownik ma możliwość modyfikowania pól formularzy lub obsługi ich za pomocą przycisków. Na podstawie danych przekazanych przez użytkownika wykonywane są zapytania do API, a otrzymane informacje są przetwarzane wewnątrz aplikacji F1stats!. Na podstawie otrzymanych wyników aplikacja generuje wykresy lub tabele ze statystykami dotyczącymi najszybszego sportu motorowego na świecie!

<h2>1. Komponent "Sezony”</h1>

Komponent wyświetla wykresy ze statystykami kierowców w wybranym sezonie.

<h4>Funkcjonalności:</h4>

- input tekstowy pozwalający na wpisanie sezonu np. 2018,

- pole select pozwalające na wybór statystyk ze względu na: ilość zdobytych punktów w sezonie lub ilość wygranych wyścigów,

- pole select pozwalające na wybór wykresu jaki powstanie na bazie danych z API - wykres blokowy, liniowy lub punktowy,

- przycisk “Szukaj",

- przycisk “Kolejny Sezon",

- przycisk "Poprzedni Sezon",

- komponent wyświetla także numer sezonu oraz ilość wyścigów jaka odbyła się w wybranem sezonie.

<h2>2. Komponent "Wyścigi"</h2>

Komponent wyświetla wykresy ze statystykami kierowców w wybranym wyścigu w danym sezonie i zawiera:

- komponent posiada input tekstowy pozwalający na wpisanie sezonu np. 2018 oraz input tekstowy pozwalający na wpisanie numeru wyścigu np. 3,

- pole select pozwalające na wybór statystyk ze względu na: ilość zdobytych punktów w sezonie lub ilość ukończonych okrążeń,

- pole select pozwalające na wybór wykresu jaki powstanie na bazie danych z API - wykres blokowy, liniowy lub punktowy,

- przycisk "Szukaj",

- przyciski "Kolejny Wyścig" i “Poprzedni wyścig”,

- przyciski “Kolejny Sezon” i “Poprzedni Sezon",

- komponent wyświetla także numer sezonu oraz numer, nazwę i datę wyścigu.

3. Komponent “Statusy” wyświetla wykresy pokazujące przyczyny z jakich kierowcy kończyli wyścigi na przestrzeni podanych lat, a także ile razy dana przyczyna wystąpiła. Przykładowe przyczyny to: ukończono wyścig, awaria silnika, awaria hydrauliki itp. Komponent zawiera:

- input tekstowy pozwalający na wpisanie daty od której chcemy rozpocząć wyszukiwanie,

- input tekstowy pozwalający na wpisanie daty do której chcemy rozpocząć wyszukiwanie,
- przyciski pozwalające na przewijanie powyższych dat,

- przycisk "Szukaj”,

- wyświetlanie wybranego zakresów sezonów,

- pole select pozwalające na wybór wykresu jaki powstanie na bazie danych z API - wykres blokowy, liniowy lub punktowy,

- pole select do wyboru ilości wyników do wyświetlenia. Można wyświetlić wszystkie wyniki, 5 wyników, 10 wyników lub 15 wyników w jednym czasie,

- pole select do wyboru ilości wyników które komponent będzie przewijał. Można przewijać wyniki o 1 lub o ilość jaka w danym momencie jest wyświetlata, a więc 5, 10 lub 15,

- przyciski do przewijania wykresu w lewą lub prawą stronę
Funkcjonalność przewijania i zawężania ilości wyświetlonych wyników została wprowadzona dlatego, że ilość wyników do wyświetlenia jest na tyle duża, że wykres przy wyświetleniu wszystkich jest nieczytelny. Zawężenie wyników pozwala na czytelne wyświetlenie wyników i wygodne przewijanie po wykresie w prawą lub lewą stronę.

4. Komponent “Kierowcy” wyświetla tabelę ze statystykami wybranego kierowcy. Komponent zawiera:
- input tekstowy do wpisania nazwiska kierowcy,
- przycisk "Szukaj”,

Tabela pokazuje dane:

- Imię, nazwisko, rok urodzenia oraz kraj pochodzenia kierowcy

- wszystkie pozycje jakie wybrany kierowca zajmował w klasyfikacjach generalnych we wszystkich sezonach w których brał udział,

- w których sezonach zajmował dane pozycje,

- ile wyścigów miał dany sezon,

- ile wyścigów wygrał w danym sezonie,

- ilość punktów zdobył w danym sezonie,

- w jakim zespole jeździł

5. Komponent "Aktualny sezon" wyświetla wyścigi z aktualnego sezonu. Komponent:

- wyświetla listę z nazwami i numerami wyścigów. Jeżeli jakiś wyścig już się odbył to wówczas font jest w kolorze czerwonym, jeżeli wyścig dopiero nastąpi to wówczas font jest w kolorze z pomarańczowym,

- każdy z elementów listy po kliknięciu wyświetla wykres z rezultatem danego wyścigu lub z informacją, że dany wyścig jeszcze się nie odbył,
- pole select pozwalające na wybór statystyk ze względu na: ilość zdobytych punktów w sezonie lub ilość ukończonych okrążeń,

- pole select pozwalające na wybór wykresu jaki powstanie na bazie danych z API - wykres blokowy, liniowy lub punktowy,

- komponent wyświetla także numer sezonu oraz numer, nazwę oraz datę wybranego wyścigu


6. Komponent "Home" wyświetla baner powitalny z krótką informacją o projekcie oraz wykres z rankingiem kierowców w aktualnym sezonie. Komponent zawiera:
- pole select pozwalające na wybór statystyk ze względu na: ilość zdobytych punktów w sezonie lub ilość wygranych wyścigów,

- pole select pozwalające na wybór wykresu jaki powstanie na bazie danych z API - wykres blokowy, liniowy lub punktowy.


7. Komponent “O projekcie” wyświetla link do repozytorium oraz listę technologii wykorzystanych do budowy projektu.


8. Komponent “Kontakt” zawiera linki do moich kont na portalach społecznościowych.


9. Komponent "Navigation" wyświetla menu główne, w tym menu rozwijane dla działu “Statystyki”.
10. Komponent "NotFound" obsługuje błąd 404.





Wszystkie komponenty w aplikacji posiadają również obsługę błędów. Jeżeli wpiszemy do inputa np. sezon którego jeszcze nie było to wówczas otrzymamy stosowny komunikat. Podobnie we wszystkich innych przypadkach tam, gdzie decydujemy co powinien wyświetlać dany komponent.



Wszystkie komponenty które wykorzystują dane z Ergast API posiadają animację “loadingu” danych podczas ładowania i przetwarzania zewnętrznych zasobów.


