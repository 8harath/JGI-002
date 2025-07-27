#include <stdio.h>

int main() {
    int arr[100]; 
    int n, i;
    int largest, smallest;

    printf("Enter the number of elements in the array: ");
    scanf("%d", &n);

    if (n <= 0) {
	printf("Array size should be greater than 0.\n");
	return 1;
    }

    printf("Enter the elements of the array:\n");

    for (i = 0; i < n; i++) {
	scanf("%d", &arr[i]);
    }

    largest = smallest = arr[0];

    for (i = 1; i < n; i++) {
	if (arr[i] > largest) {
	    largest = arr[i];
	}
	if (arr[i] < smallest) {
	    smallest = arr[i];
	}
    }

    printf("Largest element in the array: %d\n", largest);
    printf("Smallest element in the array: %d\n", smallest);

getch ();
return 0;
}