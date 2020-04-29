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
            int k = 0;
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
            j = 0;
            do {
                System.out.println("Print the definition of \"" + cards[j].getCardNumber() + "\":");
                System.out.print("> ");
                checkString = scanner.nextLine();
                flag = true;
                k = 0;
                if (cards[j].getCardDifinition().equals(checkString)) {
                    System.out.println("Correct answer.");
                }
                else {
                    do {
                        if (k != j) {
                            if (cards[k].getCardDifinition().equals(checkString)) {
                                System.out.println("Wrong answer. The correct one is \"" + cards[k].getCardDifinition()
                                + "\", you've just written the definition of \"" + cards[k].getCardName()
                                + "\".");
                                flag = false;
                            }
                        }
                        k++;
                    } while (flag && k<n);
                    if (k >= n && flag) {
                        System.out.println("Wrong answer. The correct one is \""+cards[j].getCardDifinition()+"\".");
                    }
                }
                j++;
            } while (j < n);
        } else {
            System.out.println("No cards, no game.");
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