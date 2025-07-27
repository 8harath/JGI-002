#include <stdio.h>
#include <conio.h>
int main() {
    int num, count = 0;
     clrscr ();

    printf("Enter an integer: ");
    scanf("%d", &num);

    // Handle the case of a zero
    if (num == 0) {
        count = 1;
    } else {
        // Use a do-while loop to count digits
        do {
            num /= 10; // Remove the last digit
            count++;   // Increment the count
        } while (num != 0);
    }

    printf("Number of digits: %d\n", count);
getch ();
    return 0;
}
