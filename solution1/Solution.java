import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        // Input block
        Scanner scan = new Scanner(System.in);
        int i = scan.nextInt(); // input int
        Double d = scan.nextDouble();// input double
        scan.nextLine();// !!!before input string
        String s = scan.nextLine();// input string
        scan.close();// !!!destroy Scanner object
        // Output block
        System.out.println("String: " + s);// out string
        System.out.println("Double: " + d);// out double
        System.out.println("Int: " + i);// out int
    }
}