package rotation;

public class UsingTemp {
    // This is left rotation,
    // n is length, d is position
    // Time complexity O(n) Auxiliary space: 0(p)
    static void rotate(int[] arr, int pos) {
        int[] temp = new int[pos];

        for (int i = 0; i < pos; i++) {
            temp[i] = arr[i];
        }

        for (int i = 0; i < arr.length; i++) {
            if (arr.length == (i + pos)) break;
            arr[i] = arr[i + pos];
        }

        int j = 0;

        for (int i = (arr.length - pos); i < arr.length; i++) {
            if (temp.length == j) break;
            arr[i] = temp[j];
            j++;
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
        rotate(arr, 2);
        printArray(arr);
    }
}
