#include <stdio.h>
#include <conio.h>

int main() {
    int n, sum = 0, i = 1;

    printf("Enter the value of N: ");
    scanf("%d", &n);

    
    while (i <= n) {
        sum += i;
        i++;
    }

    printf("The sum of the first %d natural numbers is: %d\n", n, sum);
    
    getch();

    return 0;
}
