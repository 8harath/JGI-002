#include <stdio.h>
#include <conio.h>

int main() {
    float basicSalary, ta, da, hra, grossSalary, deductions, pf, netPay, totalDeductions;
    clrscr();

    printf("Enter Basic Salary, Travel Allowance (TA), Dearness Allowance (DA), House Rent Allowance (HRA), Provident Fund (PF) Deduction, and Other Deductions (separated by spaces): ");
    scanf("%f %f %f %f %f %f", &basicSalary, &ta, &da, &hra, &pf, &deductions);

    grossSalary = basicSalary + ta + da + hra;
    totalDeductions = pf + deductions;
    netPay = grossSalary - totalDeductions;

    printf("Gross Salary: %.2f\nTotal Deductions: %.2f\nNet Pay: %.2f\n", grossSalary, totalDeductions, netPay);

    getch();
    return 0;
}
