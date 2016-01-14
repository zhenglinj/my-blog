#!/usr/bin/env python3

import random

# 洗牌算法 Random shuffle
def random_shuffle(nums):
    for i in range(0, len(nums)):
        j = random.randint(0, i)
        if (i != j):
            nums[i], nums[j] = nums[j], nums[i]
    return

# 求序列的逆序数
# Merge sort
def inversions1(nums):
    counter = 0

    def merge_sort(nums):
        nonlocal counter
        if (len(nums) == 1):
            return
        mid = len(nums) // 2
        nums_l = nums[:mid]
        nums_r = nums[mid:]
        merge_sort(nums_l)
        merge_sort(nums_r)
        idx, l, r = 0, 0, 0
        while (True):
            if (l == len(nums_l) and
                r == len(nums_r)):
                break
            elif (l == len(nums_l)):
                nums[idx] = nums_r[r]
                r += 1
            elif (r == len(nums_r)):
                nums[idx] = nums_l[l]
                l += 1
            else:
                if (nums_l[l] <= nums_r[r]):
                    nums[idx] = nums_l[l]
                    l += 1
                else:
                    nums[idx] = nums_r[r]
                    r += 1
                    counter += len(nums_l) - l
            idx += 1
        return

    merge_sort(nums[:])
    return counter

# Bubble sort
def inversions2(nums):
    counter = 0

    def bubble_sort(nums):
        nonlocal counter
        for i in range(len(nums), 1, -1):
            for j in range(1, i):
                if (nums[j-1] > nums[j]):
                    nums[j-1], nums[j] = nums[j], nums[j-1]
                    counter += 1
        return

    bubble_sort(nums[:])
    return counter


if __name__ == '__main__':
    nums = list(range(0, 10))
    random_shuffle(nums)
    print(nums)

    ret = inversions1(nums)
    print("The number of inversions: ", ret)
    ret = inversions2(nums)
    print("The number of inversions: ", ret)
