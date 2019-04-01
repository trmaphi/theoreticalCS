package array.rotation;

public class OnebyOne {
    static void leftRotate(int[] arr, int p, int n) {
        for (int i = 0; i < p; i++) {
            // Rotate one by one
            int j, temp;
            temp = arr[0];
            for (j = 0; j < n - 1; j++) {
                arr[j] = arr[j + 1];
            }
            arr[j] = temp;
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
        leftRotate(arr, 2, 7);

    }
}

