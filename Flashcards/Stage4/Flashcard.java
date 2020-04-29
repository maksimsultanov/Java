package Stage4;

/**
 * Flashcard
 */
public class Flashcard {

    public static void main(String[] args) {

    }
}


// Класс Card содержит следующие атрибуты:
//     int number - порядковый номер объкта Card
//     String definition - definition объкта Card
//     String name - имя объкта Card

// Класс Card содержит следующие методы:
//     public Card() - конструктор класса, задаёт значения атрибутам number, definition, name
//     public void setCardName(String name) - позволяет изменять значения атрибута name
//     public void setCardNumber(int number)
//     public void setCardDifinition(String definition)
//     public String getCardName()
//     public String getCardDifinition()
//     public int getCardNumber()

class Card {
    int number;
    String definition;
    String name;

    public Card() {
        this.number = 0;
        this.name = "";
        this.definition = "";
    }

    public void setCardName(String name) {
        this.name = name;
    }

    public void setCardNumber(int number) {
        this.number = number;
    }

    public void setCardDifinition(String definition) {
        this.definition = definition;
    }

    public String getCardName() {
        return this.name;
    }

    public String getCardDifinition() {
        return this.definition;
    }

    public int getCardNumber() {
        return this.number;
    }
}