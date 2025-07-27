
#include <stdio.h>

int main() { 
 int rows, cols;
 int matrix1[rows][cols], matrix2[rows][cols], sum[rows][cols];
 printf("Enter the number of rows: ");
 scanf("%d", &rows);
 printf("Enter the number of columns: ");
 scanf("%d", &cols);

 printf("Enter elements for the first matrix:\n");
14
 for (int i = 0; i < rows; i++)
 {
 for (int j = 0; j < cols; j++) 
{ 
 scanf("%d", &matrix1[i][j]); 
 } 
 } 
