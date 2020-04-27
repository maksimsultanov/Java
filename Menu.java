import java.util.Scanner;

public class Menu {
    public static void main(String[] args) {
        System.out.println("Введите операцию:");
        System.out.println("1. Сложение");
        System.out.println("2. Вычитание");
        System.out.println("3. Умножение");
        System.out.println("4. Деление");
        Scanner scanner = new Scanner(System.in);
        int operation = scanner.nextInt();
        System.out.print("Введите первое число: ");
        int a = scanner.nextInt();
        System.out.println();
        System.out.print("Введите второе число: ");
        int b = scanner.nextInt();
        System.out.println();
        double result;
        if (operation == 1) {
            result = a + b;
        } else if (operation == 2) {
            result = a - b;
        } else if (operation == 3) {
            result = a * b;
        } else if (operation == 4) {
            if (b == 0) {
                result = 0;
                System.out.println("Деление на ноль не допустимо!");
            }
            else {
                result = (double)a/b;
            }
        } else {
            System.out.println("Нужно выбрать пункт меню 1, 2, 3 или 4.");
            result = 0;
        }
        System.out.println("Результат = " + result);
    }
}
