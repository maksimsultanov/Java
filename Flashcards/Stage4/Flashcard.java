package Stage4;

import java.util.Scanner;

/**
 * Flashcard
 */
public class Flashcard {

    public static void main(String[] args) {
        String checkString = "";// Проверка вводимиого значения
        int n = 0; // Количество карточек, по умолчанию 0
        boolean checkExist = true;// Флаг проверки значения
        boolean flag;
        Scanner scanner = new Scanner(System.in);
        System.out.println("Input the number of cards:");
        System.out.print("> ");
        n = scanner.nextInt();
        if (n > 0) {
            // инициализация массива объектов класса Card имя массива cards
            Card cards[] = new Card[n];
            scanner.nextLine();
            int j = 0;
            for (int i = 0; i < n; i++) {
                cards[i] = new Card();
                cards[i].setCardNumber(i + 1);
                System.out.println("The Card #" + cards[i].getCardNumber() + ':');
                System.out.print("> ");
                checkString = scanner.nextLine();
                checkExist = false;
                if (i == 0) {
                    cards[i].setCardName(checkString);
                } else {
                    do {
                        j = 0;
                        do {
                            checkExist = false;
                            flag = checkString.equals(cards[j].getCardName());
                            if (flag) {
                                checkExist = true;
                                System.out.println(
                                        "The card \"" + cards[j].getCardName() + "\" already exists. Try again:");
                                j = i;
                                System.out.print("> ");
                                checkString = scanner.nextLine();
                            }
                            j++;
                        } while (j < i);
                    } while (checkExist);
                    cards[i].setCardName(checkString);
                }
                System.out.println("The definition of the card #" + cards[i].getCardNumber() + ':');
                System.out.print("> ");
                checkString = scanner.nextLine();
                cards[i].setCardDifinition(checkString);
            }

            for (int ii = 0; ii < n; ii++) {
                System.out.println(cards[ii].getCardNumber());
                System.out.println(cards[ii].getCardName());
                System.out.println(cards[ii].getCardDifinition());
            }
        } else {
            System.out.println("No cards, stop programm.");
        }
        scanner.close();

    }
}

// Класс Card содержит следующие атрибуты:
// int number - порядковый номер объкта Card
// String definition - definition объкта Card
// String name - имя объкта Card

// Класс Card содержит следующие методы:
// public Card() - конструктор класса, задаёт значения атрибутам number,
// definition, name
// public void setCardName(String name) - позволяет изменять значения атрибута
// name
// public void setCardNumber(int number) - позволяет изменять значения атрибута
// number
// public void setCardDifinition(String definition) - позволяет изменять
// значения атрибута definition
// public String getCardName() - возвращаяет значения атрибута name
// public String getCardDifinition() - возвращаяет значения атрибута number
// public int getCardNumber() - возвращаяет значения атрибута definition

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