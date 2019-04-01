package array.rotation;

public class OnebyOneAdvanced {
    static void rotate(int[] arr, int p, int n, boolean left) {
        for (int i = 0; i < p; i++) {
            rotatebyOne(arr, n, left);
        }
    }

    static void rotatebyOne(int[] arr, int n, boolean left) {
        int i, temp;
        if (left) {
            // Start from left size
            temp = arr[0];
            for (i = 0; i < n - 1; i++) {
                arr[i] = arr[i + 1];
            }
            arr[i] = temp;
        } else {
            // Start from right size
            temp = arr[n - 1];
            for (i = n - 1; i > 0; i--) {
                arr[i] = arr[i - 1];
            }
            arr[0] = temp;
        }

    }

    static void printArray(int[] arr) {
        for (int ele : arr) {
            System.out.print(ele + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        printArray(arr);
        rotate(arr, 2, 7, false);
        printArray(arr);
    }
}
