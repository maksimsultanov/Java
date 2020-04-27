import java.util.Scanner;

public class Number {

    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("Ваша задача угадать число.");
        for (int i = 111; i <= 333; i += 111) playLevel(i);
        scanner.close();
    }

    private static void playLevel(int range) {
        while (true) {
            int number = (int) (Math.random() * range);
            System.out.println("Угадайте число от 0 до " + range);
            int inputnumber = scanner.nextInt();
            if (inputnumber == number) {
                System.out.println("Угадали!");
                break;
            } else if (inputnumber > number) {
                System.out.println("Загаданое число меньше.");
            } else {
                System.out.println("Загаданое число больше.");
            }
        }
    }
}