// Auto-generated Pure-C Tree Ensemble for ESP32 Dev Module (m2cgen)
// Sub-0.5ms inference with ZERO external libraries!
#ifndef HAZARD_TREE_H
#define HAZARD_TREE_H

#include <math.h>

#include <string.h>
void add_vectors(double *v1, double *v2, int size, double *result) {
    for(int i = 0; i < size; ++i)
        result[i] = v1[i] + v2[i];
}
void mul_vector_number(double *v1, double num, int size, double *result) {
    for(int i = 0; i < size; ++i)
        result[i] = v1[i] * num;
}
void score(double * input, double * output) {
    double var0[8];
    double var1[8];
    double var2[8];
    double var3[8];
    double var4[8];
    double var5[8];
    double var6[8];
    double var7[8];
    double var8[8];
    double var9[8];
    double var10[8];
    double var11[8];
    double var12[8];
    double var13[8];
    double var14[8];
    double var15[8];
    if (input[9] <= 0.9710121154785156) {
        if (input[7] <= 0.7007829546928406) {
            if (input[1] <= -0.5885944664478302) {
                if (input[3] <= -0.1290324330329895) {
                    if (input[7] <= -0.6057182550430298) {
                        if (input[7] <= -0.8244376480579376) {
                            if (input[3] <= -0.18929478526115417) {
                                if (input[8] <= -0.5863731503486633) {
                                    memcpy(var15, (double[]){0.9552238805970149, 0.0, 0.015803336259877086, 0.0, 0.0, 0.0, 0.02897278314310799, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.1795685589313507) {
                                    memcpy(var15, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.4728901833295822) {
                                if (input[2] <= -0.7132821977138519) {
                                    memcpy(var15, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.5284090909090909, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4715909090909091, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.017615258693695) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.6, 0.4, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.987012987012987, 0.0, 0.0, 0.0, 0.0, 0.0, 0.012987012987012988, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -1.2368540167808533) {
                            if (input[8] <= -0.6232475340366364) {
                                if (input[6] <= 0.17161044478416443) {
                                    memcpy(var15, (double[]){0.16666666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8333333333333334, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.9559185206890106) {
                                    memcpy(var15, (double[]){0.3333333333333333, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.9545454545454546, 0.0, 0.0, 0.0, 0.0, 0.0, 0.045454545454545456, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 0.9538813531398773) {
                                if (input[8] <= -0.6050915122032166) {
                                    memcpy(var15, (double[]){0.10526315789473684, 0.0, 0.0, 0.042105263157894736, 0.0, 0.0, 0.8526315789473684, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.02040816326530612, 0.0, 0.0, 0.46938775510204084, 0.0, 0.0, 0.5102040816326531, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -0.0812133327126503) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= -0.7717211246490479) {
                        if (input[9] <= -0.02842653915286064) {
                            if (input[3] <= 1.5829060077667236) {
                                if (input[0] <= 1.8886612057685852) {
                                    memcpy(var15, (double[]){0.0007722007722007723, 0.0, 0.9652509652509653, 0.018532818532818535, 0.015444015444015446, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.8333333333333334, 0.0, 0.16666666666666666, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 0.10478535667061806) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.8235294117647058, 0.0, 0.17647058823529413, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.5670103092783505, 0.030927835051546393, 0.4020618556701031, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.627389132976532) {
                                if (input[1] <= -0.6834823489189148) {
                                    memcpy(var15, (double[]){0.5000000000000001, 0.0, 0.33333333333333337, 0.12500000000000003, 0.04166666666666667, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[7] <= -0.582659125328064) {
                            if (input[8] <= -0.5911926925182343) {
                                if (input[0] <= -0.06744202226400375) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.7053571428571429, 0.16964285714285715, 0.125, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.07246376811594203, 0.0, 0.3333333333333333, 0.13043478260869565, 0.463768115942029, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.6921553611755371) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.17391304347826086, 0.5217391304347826, 0.30434782608695654, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0136986301369863, 0.1917808219178082, 0.7945205479452054, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= -0.9861554205417633) {
                                if (input[9] <= -1.1658496856689453) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.037037037037037035, 0.037037037037037035, 0.9259259259259259, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -1.202360212802887) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.041666666666666664, 0.2604166666666667, 0.6979166666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.006085192697768763, 0.4908722109533469, 0.5030425963488844, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[3] <= -0.3735911548137665) {
                    if (input[7] <= -0.8125050365924835) {
                        if (input[2] <= 0.8310363590717316) {
                            if (input[0] <= 1.3267254829406738) {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var15, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[0] <= 1.5512766242027283) {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var15, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= -0.6026837825775146) {
                            if (input[9] <= 0.16308648884296417) {
                                if (input[7] <= -0.7271805703639984) {
                                    memcpy(var15, (double[]){0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.017316017316017316, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9826839826839827, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= 0.06237210985273123) {
                                    memcpy(var15, (double[]){0.8181818181818182, 0.0, 0.0, 0.0, 0.0, 0.0, 0.18181818181818182, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.3076923076923077, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6923076923076923, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[0] <= 1.5911925435066223) {
                        if (input[0] <= 0.2815597504377365) {
                            if (input[1] <= 0.04883151315152645) {
                                if (input[10] <= 1.6644272953271866) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.4961580680570801, 0.5038419319429198, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.9019607843137255, 0.09803921568627451, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.9202313423156738) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.6936026936026936, 0.3063973063973064, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.31668056547641754) {
                                if (input[6] <= 0.7274007201194763) {
                                    memcpy(var15, (double[]){0.004608294930875576, 0.0, 0.0, 0.2834101382488479, 0.7119815668202765, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.7941176470588235, 0.20588235294117646, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.4804888516664505) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.7395833333333334, 0.2604166666666667, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.4322916666666667, 0.5677083333333334, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 0.7065872512757778) {
                            memcpy(var15, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[5] <= 0.7174184918403625) {
                if (input[4] <= -1.5877594351768494) {
                    if (input[4] <= -1.826335370540619) {
                        memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[8] <= 1.522904396057129) {
                            if (input[2] <= -1.1091080904006958) {
                                if (input[7] <= 1.2411999106407166) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.9285714285714286, 0.0, 0.0, 0.0, 0.0, 0.07142857142857142, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 1.651019811630249) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.10706555098295212) {
                                if (input[7] <= 1.525001347064972) {
                                    memcpy(var15, (double[]){0.0, 0.26666666666666666, 0.0, 0.0, 0.0, 0.0, 0.7333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[5] <= 0.028815786354243755) {
                        if (input[9] <= 0.47368024289608) {
                            if (input[8] <= 1.9933762550354004) {
                                if (input[8] <= 1.6818748712539673) {
                                    memcpy(var15, (double[]){0.0, 0.055900621118012424, 0.0, 0.0, 0.0, 0.0, 0.9440993788819876, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.35, 0.0, 0.0, 0.0, 0.0, 0.65, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -1.2246953845024109) {
                                memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= -0.5503772646188736) {
                                    memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -0.9973591566085815) {
                            if (input[8] <= 1.469285786151886) {
                                if (input[5] <= 0.06952837109565735) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.10526315789473684, 0.0, 0.0, 0.0, 0.0, 0.8947368421052632, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -1.1052672266960144) {
                                    memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.18181818181818182, 0.0, 0.0, 0.0, 0.2727272727272727, 0.5454545454545454, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.12230849266052246) {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= -0.6689262092113495) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9922480620155039, 0.007751937984496124, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9230769230769231, 0.07692307692307693, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[0] <= -0.7484816312789917) {
                    if (input[4] <= -1.4698216915130615) {
                        memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[4] <= -1.1972553133964539) {
                            if (input[3] <= -0.6780974864959717) {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[5] <= 1.479476273059845) {
                        if (input[4] <= -1.0741928219795227) {
                            if (input[6] <= 2.380155920982361) {
                                memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.49801264982670546) {
                                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= 0.06625594943761826) {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[2] <= 1.1729182600975037) {
                            memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[0] <= -0.10394829884171486) {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[4] <= -1.3327853679656982) {
            if (input[9] <= 3.1884132623672485) {
                if (input[1] <= 0.6596885621547699) {
                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                } else {
                    if (input[8] <= 0.06527319550514221) {
                        memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
            }
        } else {
            if (input[8] <= 0.32375505566596985) {
                if (input[0] <= 1.6975844502449036) {
                    memcpy(var15, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                } else {
                    memcpy(var15, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            } else {
                memcpy(var15, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            }
        }
    }
    double var16[8];
    if (input[8] <= 0.08627868443727493) {
        if (input[3] <= -0.20509470999240875) {
            if (input[3] <= -0.5428878664970398) {
                if (input[2] <= 0.1339166760444641) {
                    if (input[9] <= 0.9654439687728882) {
                        if (input[2] <= -0.3614298105239868) {
                            if (input[3] <= -0.947224348783493) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= 1.3662073612213135) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.9730639730639731, 0.0, 0.0, 0.0, 0.0, 0.0, 0.026936026936026935, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= -0.5944737493991852) {
                                if (input[6] <= 0.34505902230739594) {
                                    memcpy(var16, (double[]){0.7291666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2708333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.8764044943820225, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12359550561797752, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.5122785568237305) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= -0.6046619415283203) {
                            memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        } else {
                            if (input[3] <= -0.6038343608379364) {
                                memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[8] <= -0.5126027762889862) {
                        if (input[1] <= -0.7208868563175201) {
                            if (input[9] <= 0.9682269990444183) {
                                if (input[2] <= 1.5889366269111633) {
                                    memcpy(var16, (double[]){0.6796875, 0.0, 0.00390625, 0.0, 0.0, 0.0, 0.31640625, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[0] <= 1.6639231443405151) {
                                if (input[8] <= -0.5634576678276062) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7330508474576272, 0.2669491525423729}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5774647887323944, 0.4225352112676056}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[6] <= 1.3060247898101807) {
                            if (input[8] <= -0.21498644351959229) {
                                if (input[8] <= -0.4853428155183792) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3563218390804598, 0.6436781609195402}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07705779334500876, 0.9229422066549913}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.2941918584983796) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.4652804583311081) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[7] <= -0.5674352943897247) {
                    if (input[0] <= 1.420777142047882) {
                        if (input[8] <= -0.5306897759437561) {
                            if (input[1] <= -1.246295690536499) {
                                memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[3] <= -0.3735068440437317) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.06896551724137931, 0.0, 0.0, 0.0, 0.896551724137931, 0.034482758620689655}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.2631578947368421, 0.7368421052631579, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.192740797996521) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[0] <= 1.4847126007080078) {
                            if (input[7] <= -0.9201631844043732) {
                                memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= -0.3556819260120392) {
                                    memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[9] <= 0.7422206401824951) {
                        if (input[3] <= -0.359740749001503) {
                            if (input[7] <= -0.5395829677581787) {
                                if (input[8] <= -0.608720600605011) {
                                    memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[0] <= 1.3992766439914703) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[7] <= -0.845800369977951) {
                if (input[0] <= 1.7964537739753723) {
                    if (input[3] <= 1.7934619188308716) {
                        if (input[7] <= -1.066094696521759) {
                            memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[1] <= -0.5851514339447021) {
                                if (input[7] <= -1.065086543560028) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.25, 0.75, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0017301038062283738, 0.0, 0.9411764705882353, 0.02768166089965398, 0.029411764705882353, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5681628584861755) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.28, 0.72, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.7777777777777778, 0.2222222222222222, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.600247323513031) {
                            if (input[8] <= -0.6068304777145386) {
                                if (input[7] <= -1.069984495639801) {
                                    memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.2564102564102564, 0.05128205128205128, 0.6923076923076923, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 0.7932873964309692) {
                                    memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= -1.5854157209396362) {
                                memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[6] <= 1.0835358500480652) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.03636363636363636, 0.03636363636363636, 0.9272727272727272, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= 0.2580158021301031) {
                        if (input[2] <= -0.40163977444171906) {
                            if (input[2] <= -0.4152804762125015) {
                                memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[8] <= -0.5929269194602966) {
                    if (input[1] <= -1.4608352184295654) {
                        memcpy(var16, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[7] <= -0.6755010485649109) {
                            if (input[1] <= -0.5827365815639496) {
                                if (input[0] <= 0.76612389087677) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.7266666666666667, 0.08, 0.19333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.22727272727272727, 0.0, 0.18181818181818182, 0.0, 0.5909090909090909, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.4783321619033813) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.3700787401574803, 0.6299212598425197, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 0.037218693643808365) {
                                if (input[9] <= -0.18213994055986404) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.03515625, 0.44921875, 0.515625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.019736842105263157, 0.0, 0.019736842105263157, 0.23026315789473684, 0.7302631578947368, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 0.7030035853385925) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.726027397260274, 0.273972602739726, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.29545454545454547, 0.7045454545454546, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= 1.1015926003456116) {
                        if (input[9] <= 1.2912293076515198) {
                            if (input[3] <= 1.037041425704956) {
                                if (input[3] <= 0.7727663218975067) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0021321961620469083, 0.9957356076759062, 0.0021321961620469083, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.034482758620689655, 0.9137931034482759, 0.05172413793103448, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 0.8743104636669159) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.8695652173913043, 0.13043478260869565, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[2] <= 1.5470412373542786) {
                            if (input[8] <= -0.5197765529155731) {
                                if (input[2] <= -0.14706704020500183) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0379746835443038, 0.9620253164556962, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.22371967654986524, 0.7762803234501348, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.6853533089160919) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.38461538461538464, 0.6153846153846154, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.9834616780281067) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[3] <= 1.9228625893592834) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.875, 0.125, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.3, 0.7, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[2] <= -1.1397137641906738) {
            if (input[1] <= 0.9290546178817749) {
                if (input[4] <= -1.3815222382545471) {
                    if (input[7] <= 0.8694820702075958) {
                        memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[0] <= -0.7007158398628235) {
                            memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[0] <= -0.6256446540355682) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            } else {
                if (input[8] <= 1.4283202290534973) {
                    if (input[9] <= 0.02481134422123432) {
                        if (input[7] <= 1.653963565826416) {
                            if (input[2] <= -2.944822907447815) {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= -1.306775450706482) {
                                    memcpy(var16, (double[]){0.0, 0.10526315789473685, 0.0, 0.0, 0.0, 0.8421052631578948, 0.052631578947368425, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.02564102564102564, 0.0, 0.0, 0.0, 0.6410256410256411, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 0.9590919613838196) {
                                if (input[8] <= 1.0968520045280457) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.95, 0.0, 0.0, 0.0, 0.05, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -1.3377670049667358) {
                                    memcpy(var16, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[5] <= 1.1752880811691284) {
                            if (input[9] <= 0.25271840393543243) {
                                if (input[1] <= 1.214292585849762) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.4, 0.6, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.9285714285714286, 0.0, 0.0, 0.0, 0.07142857142857142, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -0.345123827457428) {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= -0.27869950234889984) {
                        if (input[5] <= 0.8982113301753998) {
                            if (input[4] <= -0.536772333085537) {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[8] <= 2.31004798412323) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[5] <= 2.8107693791389465) {
                                    memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= -0.8192738890647888) {
                            if (input[4] <= -0.9054224789142609) {
                                if (input[7] <= 1.156951367855072) {
                                    memcpy(var16, (double[]){0.0, 0.14285714285714285, 0.0, 0.0, 0.0, 0.0, 0.8571428571428571, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.9911504424778761, 0.0, 0.0, 0.0, 0.0, 0.008849557522123894, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= 1.7422860860824585) {
                                if (input[1] <= 1.0200715065002441) {
                                    memcpy(var16, (double[]){0.0, 0.9696969696969697, 0.0, 0.0, 0.0, 0.0, 0.030303030303030304, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        } else {
            if (input[4] <= -1.039153516292572) {
                if (input[7] <= 1.4135004878044128) {
                    if (input[5] <= 0.8508636653423309) {
                        if (input[0] <= -0.9969830811023712) {
                            if (input[4] <= -1.5395927429199219) {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= -1.4097424745559692) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= 1.3397338390350342) {
                                if (input[8] <= 1.9241483211517334) {
                                    memcpy(var16, (double[]){0.0, 0.0782608695652174, 0.0, 0.0, 0.0, 0.0, 0.9217391304347826, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.9285714285714286, 0.0, 0.0, 0.0, 0.0, 0.07142857142857142, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.01272297091782093) {
                                    memcpy(var16, (double[]){0.0, 0.4, 0.0, 0.0, 0.0, 0.0, 0.6, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -1.4750392436981201) {
                            if (input[1] <= 0.7835076153278351) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[4] <= -1.5877594351768494) {
                        if (input[2] <= 0.34671999514102936) {
                            if (input[7] <= 1.4572539925575256) {
                                if (input[8] <= 1.43604975938797) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.9642857142857143, 0.0, 0.0, 0.0, 0.0, 0.03571428571428571, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.19605933129787445) {
                                    memcpy(var16, (double[]){0.0, 0.918918918918919, 0.0, 0.0, 0.0, 0.0, 0.08108108108108109, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.9970414201183432, 0.0, 0.0, 0.0, 0.0, 0.0029585798816568047, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[5] <= 0.869000256061554) {
                            if (input[9] <= 0.334968701004982) {
                                if (input[0] <= -1.1707848906517029) {
                                    memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.10869565217391304, 0.0, 0.0, 0.0, 0.043478260869565216, 0.8478260869565217, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[8] <= 2.1161094307899475) {
                                if (input[3] <= -0.6619857847690582) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var16, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[5] <= 0.007606790401041508) {
                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[7] <= 1.202885389328003) {
                        if (input[7] <= 1.198265790939331) {
                            if (input[2] <= -1.1245847344398499) {
                                if (input[1] <= 1.3261502087116241) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 1.1508911848068237) {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9565217391304348, 0.043478260869565216, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[6] <= 2.416971206665039) {
                            memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[4] <= -0.6688434928655624) {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var16, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var15, var16, 8, var14);
    double var17[8];
    if (input[3] <= -0.21080586314201355) {
        if (input[4] <= -1.4622389674186707) {
            if (input[4] <= -1.693308413028717) {
                if (input[9] <= -0.7485802471637726) {
                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[2] <= 0.34671999514102936) {
                        if (input[8] <= 1.0397138595581055) {
                            if (input[8] <= 1.0265051126480103) {
                                if (input[5] <= -0.5182263255119324) {
                                    memcpy(var17, (double[]){0.0, 0.8125, 0.0, 0.0, 0.0, 0.0, 0.1875, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.972972972972973, 0.0, 0.0, 0.0, 0.0, 0.02702702702702703, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -2.2854886054992676) {
                                    memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 0.7611236870288849) {
                                if (input[8] <= 1.208016574382782) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.96, 0.0, 0.0, 0.0, 0.0, 0.04, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.8263261318206787) {
                                    memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.9528301886792453, 0.0, 0.0, 0.0, 0.0, 0.04716981132075472, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[2] <= -1.3403151035308838) {
                    memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[8] <= 1.8842681646347046) {
                        if (input[9] <= 0.5658953338861465) {
                            if (input[0] <= -1.0325751304626465) {
                                if (input[6] <= -0.8288151770830154) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.75, 0.0, 0.0, 0.0, 0.25, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.5944162607192993) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.08333333333333333, 0.9166666666666666, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 0.9741081595420837) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[6] <= -1.7652698755264282) {
                            memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[7] <= 1.0660601258277893) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        } else {
            if (input[8] <= 0.08627868443727493) {
                if (input[1] <= -0.5843833386898041) {
                    if (input[8] <= -0.5890556871891022) {
                        if (input[1] <= -1.141196072101593) {
                            if (input[9] <= 0.10149738565087318) {
                                if (input[0] <= 1.411505937576294) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.23076923076923078, 0.07692307692307693, 0.0, 0.0, 0.6923076923076923, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.9854545454545455, 0.0, 0.0, 0.0, 0.0, 0.0, 0.014545454545454545, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.2708491161465645) {
                                    memcpy(var17, (double[]){0.9955555555555555, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0044444444444444444, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.039888208732008934) {
                                if (input[9] <= 0.993672639131546) {
                                    memcpy(var17, (double[]){0.8581560283687943, 0.0, 0.028368794326241134, 0.0, 0.0, 0.0, 0.11347517730496454, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.125, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.875}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.9168898165225983) {
                                    memcpy(var17, (double[]){0.6153846153846154, 0.0, 0.00641025641025641, 0.00641025641025641, 0.0, 0.0, 0.3717948717948718, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[9] <= 0.5283417142927647) {
                            if (input[2] <= 1.1153288185596466) {
                                if (input[6] <= -0.3575751855969429) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.07692307692307693, 0.15384615384615385, 0.0, 0.0, 0.7692307692307693, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[2] <= 1.4874776601791382) {
                        if (input[5] <= 0.7507085204124451) {
                            if (input[7] <= -0.9073203206062317) {
                                if (input[7] <= -1.0506209135055542) {
                                    memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.9636363636363636, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03636363636363636, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -0.23082180321216583) {
                                    memcpy(var17, (double[]){0.017937219730941707, 0.0, 0.0, 0.004484304932735427, 0.0, 0.0, 0.1008968609865471, 0.8766816143497759}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.036741214057507986, 0.0, 0.0, 0.012779552715654952, 0.0, 0.0, 0.43450479233226835, 0.5159744408945687}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= -1.0035668909549713) {
                                if (input[7] <= -0.19860593602061272) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8571428571428571, 0.14285714285714285}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.8616231083869934) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9166666666666666, 0.08333333333333333}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= -0.6131502091884613) {
                            if (input[4] <= 0.056408241391181946) {
                                if (input[8] <= -0.45118819177150726) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7083333333333334, 0.2916666666666667}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.7807186245918274) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9127906976744186, 0.0872093023255814}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= -0.004001140594482422) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[2] <= -1.827917754650116) {
                    if (input[9] <= 0.11356071755290031) {
                        if (input[5] <= 0.36148080229759216) {
                            if (input[2] <= -2.009674847126007) {
                                if (input[7] <= 1.3456275463104248) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -1.2029371857643127) {
                                memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[4] <= -0.8084779679775238) {
                        if (input[5] <= 0.7151888012886047) {
                            if (input[8] <= 1.7084860801696777) {
                                if (input[3] <= -1.0291826128959656) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.06629834254143646, 0.0, 0.0, 0.0, 0.022099447513812154, 0.9116022099447514, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.07736472878605127) {
                                    memcpy(var17, (double[]){0.0, 0.19047619047619047, 0.0, 0.0, 0.0, 0.047619047619047616, 0.7619047619047619, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.5237937718629837) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[6] <= 1.0923168659210205) {
                            if (input[4] <= -0.7033308148384094) {
                                if (input[2] <= -0.6231207549571991) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.8888888888888888, 0.1111111111111111, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.6568375527858734) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9956896551724138, 0.004310344827586207, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= -0.05416876822710037) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[7] <= -0.8016302287578583) {
            if (input[0] <= 1.4973210096359253) {
                if (input[8] <= -0.5850311815738678) {
                    if (input[2] <= -0.08199169859290123) {
                        if (input[1] <= -0.48827899992465973) {
                            if (input[0] <= 1.3787448406219482) {
                                if (input[6] <= -1.007289707660675) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.9632352941176471, 0.014705882352941176, 0.022058823529411766, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.4294663667678833) {
                                    memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[7] <= -1.0655196905136108) {
                            memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[0] <= -0.139881893992424) {
                                if (input[1] <= -0.5417704731225967) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.9377593360995851, 0.02074688796680498, 0.04149377593360996, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.3617021276595745, 0.6382978723404256, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.2817792296409607) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.7366071428571429, 0.06696428571428571, 0.19642857142857142, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.2682926829268293, 0.14634146341463414, 0.5853658536585366, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[8] <= -0.5732596516609192) {
                        if (input[7] <= -1.0705419778823853) {
                            memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[6] <= -0.45684467256069183) {
                                if (input[8] <= -0.5767438411712646) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.4, 0.6, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5821089148521423) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.1111111111111111, 0.2222222222222222, 0.6666666666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.47368421052631576, 0.5263157894736842, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.0603651702404022) {
                            if (input[7] <= -1.0050108134746552) {
                                if (input[1] <= -1.0854157507419586) {
                                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.8271897435188293) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -1.0269147157669067) {
                                if (input[9] <= -0.5617023706436157) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.1111111111111111, 0.7777777777777778, 0.1111111111111111, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 1.2965598106384277) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.05357142857142857, 0.9464285714285714, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.375, 0.625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[3] <= 0.045678962022066116) {
                    memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[2] <= -1.0585647225379944) {
                        memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[1] <= -0.933934360742569) {
                            memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[3] <= 1.0988998413085938) {
                if (input[1] <= -1.0036254525184631) {
                    if (input[7] <= -0.6591015756130219) {
                        if (input[4] <= -0.47769421339035034) {
                            if (input[7] <= -0.7424454391002655) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.22243770211935043) {
                                if (input[3] <= 0.522909015417099) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.9411764705882353, 0.058823529411764705, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[3] <= 0.8585114181041718) {
                            if (input[3] <= 0.6211113333702087) {
                                if (input[9] <= 0.3542156219482422) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0975609756097561, 0.9024390243902439, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -0.610014945268631) {
                                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.3333333333333333, 0.6666666666666666, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.10541723668575287) {
                                if (input[5] <= -0.9073351621627808) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.07692307692307693, 0.9230769230769231, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[0] <= 1.777658760547638) {
                        if (input[7] <= -0.6366829574108124) {
                            if (input[5] <= 0.7200577855110168) {
                                if (input[8] <= -0.5982732176780701) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.3230769230769231, 0.6153846153846154, 0.06153846153846154, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[0] <= 0.9994190037250519) {
                                if (input[8] <= -0.625080406665802) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.9424460431654677, 0.05755395683453238, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.004016064257028112, 0.9906291834002677, 0.00535475234270415, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.5155390352010727) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.9523809523809523, 0.047619047619047616, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        memcpy(var17, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[1] <= -1.4629684090614319) {
                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[9] <= -0.1450188234448433) {
                        if (input[2] <= -0.1729423850774765) {
                            if (input[1] <= -0.9455974996089935) {
                                if (input[3] <= 1.3230124115943909) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.7692307692307693, 0.15384615384615385, 0.07692307692307693, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.2903225806451613, 0.03225806451612903, 0.6774193548387096, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.7935533225536346) {
                                    memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.029585798816568046, 0.14201183431952663, 0.8284023668639053, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 0.3594168424606323) {
                                if (input[5] <= 0.38177458941936493) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.029511918274687854, 0.3518728717366629, 0.6186152099886493, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.05084745762711865, 0.559322033898305, 0.3898305084745763, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 0.03313840087503195) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.013440860215053764, 0.16666666666666666, 0.8198924731182796, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.42857142857142855, 0.5714285714285714, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= 1.0930898189544678) {
                            if (input[2] <= 0.10719754919409752) {
                                if (input[1] <= 0.8296903669834137) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.016666666666666666, 0.9833333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.850404977798462) {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.3238095238095238, 0.6761904761904762, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var17, (double[]){0.0, 0.0, 0.0, 0.052083333333333336, 0.9479166666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 0.31992872804403305) {
                                memcpy(var17, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var17, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var14, var17, 8, var13);
    double var18[8];
    if (input[7] <= 0.9149860739707947) {
        if (input[3] <= -0.21243371069431305) {
            if (input[8] <= -0.5953622460365295) {
                if (input[1] <= -0.10977381095290184) {
                    if (input[1] <= -1.0690059661865234) {
                        if (input[0] <= 1.420777142047882) {
                            if (input[9] <= -0.8998924195766449) {
                                if (input[4] <= 0.04835645854473114) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.9046924412250519) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.6666666666666666, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9787234042553191, 0.02127659574468085}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 1.5707940459251404) {
                                if (input[2] <= 0.15805167704820633) {
                                    memcpy(var18, (double[]){0.9583333333333334, 0.0, 0.0, 0.0, 0.0, 0.0, 0.041666666666666664, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.6111111111111112, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3888888888888889, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.6062589585781097) {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.9902912621359223, 0.0, 0.0, 0.0, 0.0, 0.0, 0.009708737864077669, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= -0.7901686728000641) {
                            if (input[8] <= -0.6174255311489105) {
                                if (input[0] <= 1.4015374183654785) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.17142857142857143, 0.0, 0.0, 0.0, 0.8285714285714286, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.9663299663299664, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03367003367003367, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.8646247982978821) {
                                    memcpy(var18, (double[]){0.9877551020408163, 0.0, 0.00816326530612245, 0.0, 0.0, 0.0, 0.004081632653061225, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.8723404255319149, 0.0, 0.02127659574468085, 0.0, 0.0, 0.0, 0.10638297872340426, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.725083664059639) {
                                if (input[9] <= 0.017974862828850746) {
                                    memcpy(var18, (double[]){0.19724770642201836, 0.0, 0.0, 0.03669724770642202, 0.0, 0.0, 0.7660550458715596, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.6, 0.0, 0.0, 0.044444444444444446, 0.0, 0.0, 0.35555555555555557, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.8367434442043304) {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= -0.4793172776699066) {
                        if (input[9] <= 0.9632912278175354) {
                            if (input[0] <= 1.3756945729255676) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[9] <= 0.9769234657287598) {
                            if (input[1] <= 0.2009897381067276) {
                                if (input[7] <= -0.44250520691275597) {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.24439437687397) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[8] <= -0.5197110772132874) {
                    if (input[9] <= 0.8735681474208832) {
                        if (input[3] <= -0.40804074704647064) {
                            if (input[8] <= -0.5897540748119354) {
                                if (input[1] <= -0.6306374371051788) {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.045454545454545456, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9545454545454546, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[2] <= 0.25584404170513153) {
                                if (input[0] <= 0.9865948408842087) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.5714285714285714, 0.42857142857142855, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[7] <= 0.7038938999176025) {
                        if (input[9] <= 0.8438712358474731) {
                            if (input[1] <= -0.6412046551704407) {
                                if (input[8] <= -0.44142118096351624) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.7142857142857143, 0.0, 0.0, 0.2857142857142857, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 1.2678391337394714) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[8] <= -0.3468083292245865) {
                            if (input[3] <= -0.5810444355010986) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            } else {
                                if (input[5] <= 0.3863530158996582) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -0.929106593132019) {
                                if (input[2] <= -1.2448617815971375) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.5428878664970398) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9411764705882353, 0.058823529411764705, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[8] <= -0.5929876565933228) {
                if (input[0] <= 1.9436614513397217) {
                    if (input[7] <= -0.7640953958034515) {
                        if (input[7] <= -0.888384073972702) {
                            if (input[9] <= -0.18433918058872223) {
                                if (input[3] <= 1.8412877917289734) {
                                    memcpy(var18, (double[]){0.003372681281618887, 0.0, 0.9704890387858347, 0.00927487352445194, 0.016863406408094434, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.6101694915254238, 0.0, 0.3898305084745763, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -1.0691749453544617) {
                                    memcpy(var18, (double[]){0.1, 0.0, 0.9, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.027777777777777776, 0.0, 0.5, 0.1388888888888889, 0.3333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.5756544470787048) {
                                if (input[5] <= -0.7024650573730469) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.6590909090909091, 0.022727272727272728, 0.3181818181818182, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.017045454545454544, 0.0, 0.8636363636363636, 0.06818181818181818, 0.05113636363636364, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.4048787951469421) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.34328358208955223, 0.6567164179104478, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 0.9821730256080627) {
                            if (input[6] <= 1.238877296447754) {
                                if (input[7] <= -0.6845001876354218) {
                                    memcpy(var18, (double[]){0.04651162790697675, 0.0, 0.39534883720930236, 0.44186046511627913, 0.11627906976744187, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.02247191011235955, 0.9573033707865168, 0.020224719101123594, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 0.33940844237804413) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.9, 0.0, 0.1, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.6620525419712067) {
                                if (input[1] <= -0.86369189620018) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.8292682926829269, 0.07317073170731708, 0.09756097560975611, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.023529411764705882, 0.2, 0.7764705882352941, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.32041507959365845) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.017699115044247787, 0.32035398230088497, 0.6619469026548672, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.004761904761904762, 0.1523809523809524, 0.8428571428571429, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= -0.8995884358882904) {
                        if (input[4] <= -0.48116281628608704) {
                            if (input[2] <= 0.03288360685110092) {
                                memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[3] <= 0.9191887825727463) {
                            memcpy(var18, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[5] <= -0.9670491516590118) {
                                memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[2] <= 0.015817486215382814) {
                    if (input[6] <= -0.8253527283668518) {
                        if (input[3] <= 1.1667067408561707) {
                            if (input[8] <= -0.5806261003017426) {
                                if (input[7] <= -0.6082339882850647) {
                                    memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= -0.88655686378479) {
                                if (input[1] <= -0.8845517337322235) {
                                    memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5123047977685928) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.14814814814814814, 0.8518518518518519, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= 0.5042514204978943) {
                            if (input[7] <= -1.0881722569465637) {
                                memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.298439085483551) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.05755395683453238, 0.28776978417266186, 0.6546762589928058, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.10606060606060606, 0.8939393939393939, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.228118360042572) {
                                if (input[5] <= -0.43678387999534607) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.4166666666666667, 0.5833333333333334, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.10028509423136711) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= -0.5617307722568512) {
                        if (input[7] <= -1.0744313597679138) {
                            memcpy(var18, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[3] <= 1.1673566699028015) {
                                if (input[3] <= 0.9546390473842621) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.07017543859649122, 0.9210526315789473, 0.008771929824561403, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.30434782608695654, 0.5217391304347826, 0.17391304347826086, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.044940035790205) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.004807692307692308, 0.07692307692307693, 0.9182692307692307, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.03225806451612903, 0.3387096774193548, 0.6290322580645161, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.5199340879917145) {
                            if (input[3] <= 1.1054112911224365) {
                                if (input[0] <= -0.6121325790882111) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.9420289855072463, 0.057971014492753624, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.9966887417218543, 0.0033112582781456954, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.7313358783721924) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.29608938547486036, 0.7039106145251397, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.9, 0.1, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.9182437062263489) {
                                if (input[3] <= 1.3579975962638855) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.7272727272727273, 0.2727272727272727, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[8] <= 1.5319888591766357) {
            if (input[5] <= 0.5774848759174347) {
                if (input[9] <= 0.16088725626468658) {
                    if (input[4] <= -0.4621947705745697) {
                        if (input[0] <= -1.1292924284934998) {
                            if (input[2] <= -1.5519525408744812) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.6488302946090698) {
                                    memcpy(var18, (double[]){0.0, 0.16666666666666669, 0.0, 0.0, 0.0, 0.6666666666666667, 0.16666666666666669, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -1.8424713015556335) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= -1.9152230620384216) {
                                    memcpy(var18, (double[]){0.0, 0.875, 0.0, 0.0, 0.0, 0.0, 0.125, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.012987012987012988, 0.0, 0.0, 0.0, 0.032467532467532464, 0.9545454545454546, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[2] <= -0.8231374323368073) {
                        if (input[5] <= 0.5721999108791351) {
                            if (input[1] <= 0.7940822839736938) {
                                if (input[1] <= 0.7289901971817017) {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.5118107199668884) {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[8] <= 1.1698694825172424) {
                            if (input[7] <= 1.4371883273124695) {
                                if (input[9] <= 0.5887110829353333) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.8990068733692169) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 1.079341471195221) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[1] <= 1.280004620552063) {
                                    memcpy(var18, (double[]){0.0, 0.9333333333333333, 0.0, 0.0, 0.0, 0.0, 0.06666666666666667, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.7352941176470589, 0.0, 0.0, 0.0, 0.0, 0.2647058823529412, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[9] <= 0.5460664629936218) {
                    if (input[9] <= 0.22990451008081436) {
                        if (input[4] <= -1.7130712270736694) {
                            memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[8] <= 1.4699395895004272) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[6] <= 1.25925612449646) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.88, 0.12, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= 1.5057898163795471) {
                            if (input[4] <= -1.1253856718540192) {
                                if (input[7] <= 1.4125881791114807) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        } else {
            if (input[2] <= -0.956450343132019) {
                if (input[3] <= -0.7512530386447906) {
                    if (input[4] <= -0.9821271300315857) {
                        if (input[7] <= 1.129905879497528) {
                            if (input[2] <= -1.123958170413971) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -1.7377655506134033) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[1] <= 1.347597062587738) {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.9393939393939394, 0.0, 0.0, 0.0, 0.0, 0.06060606060606061, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -0.797508716583252) {
                            if (input[8] <= 1.6625282168388367) {
                                if (input[5] <= -0.14187590777873993) {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[4] <= -1.0749897956848145) {
                        if (input[2] <= -1.3612993359565735) {
                            memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[4] <= -1.5224398970603943) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= 0.571463480591774) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= 1.2727100849151611) {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[0] <= -0.8946120738983154) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[4] <= -1.1130178570747375) {
                    if (input[9] <= 0.1259227767586708) {
                        if (input[9] <= -0.011138219386339188) {
                            if (input[7] <= 1.3615372776985168) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= -1.3888825178146362) {
                                    memcpy(var18, (double[]){0.0, 0.96875, 0.0, 0.0, 0.0, 0.0, 0.03125, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.1111111111111111, 0.0, 0.0, 0.0, 0.5555555555555556, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 1.3027339577674866) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.5752049684524536) {
                                    memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= -0.910880446434021) {
                            if (input[4] <= -1.4953516125679016) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[10] <= 1.6644272953271866) {
                                memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= -0.07451849093195051) {
                                    memcpy(var18, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var18, (double[]){0.0, 0.3333333333333333, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[5] <= -0.009488346055150032) {
                        memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[2] <= 0.0676400437951088) {
                            memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[9] <= 0.4219626933336258) {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var18, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var13, var18, 8, var12);
    double var19[8];
    if (input[7] <= 0.916551411151886) {
        if (input[9] <= 0.9682269990444183) {
            if (input[8] <= -0.595900148153305) {
                if (input[3] <= -0.129860021173954) {
                    if (input[7] <= -0.746142566204071) {
                        if (input[7] <= -0.8084920942783356) {
                            if (input[0] <= 1.4217281341552734) {
                                if (input[0] <= 0.9085724055767059) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.8461538461538461, 0.0, 0.0, 0.0, 0.15384615384615385, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.027777777777777776, 0.0, 0.0, 0.0, 0.9722222222222222, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.9719140529632568) {
                                    memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.974477958236659, 0.0, 0.0, 0.0, 0.0, 0.0, 0.025522041763341066, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= -0.6231800615787506) {
                                if (input[3] <= -0.5156611800193787) {
                                    memcpy(var19, (double[]){0.3448275862068966, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6551724137931034, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= 0.3527315706014633) {
                                    memcpy(var19, (double[]){0.6585365853658537, 0.0, 0.0, 0.024390243902439025, 0.0, 0.0, 0.3170731707317073, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.9574468085106383, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0425531914893617, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[0] <= 1.568031370639801) {
                            if (input[7] <= -0.2729496508836746) {
                                if (input[1] <= -1.852436125278473) {
                                    memcpy(var19, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.01791044776119403, 0.0, 0.0029850746268656717, 0.03283582089552239, 0.0, 0.0, 0.9462686567164179, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.11668224260210991) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.40384615384615385, 0.0, 0.0, 0.5961538461538461, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.04424778761061947, 0.0, 0.0, 0.9557522123893806, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.44402773678302765) {
                                memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[1] <= -1.0509640574455261) {
                                    memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.6428571428571429, 0.0, 0.0, 0.0, 0.0, 0.0, 0.35714285714285715, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= 1.4794684052467346) {
                        if (input[1] <= -0.5937651693820953) {
                            if (input[1] <= -1.4602068066596985) {
                                if (input[9] <= 0.1658269539475441) {
                                    memcpy(var19, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.06293591111898422) {
                                    memcpy(var19, (double[]){0.5806451612903226, 0.0, 0.22580645161290322, 0.1935483870967742, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.004642525533890436, 0.0, 0.8430826369545033, 0.10399257195914577, 0.04828226555246054, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.82423335313797) {
                                if (input[2] <= 1.1459461450576782) {
                                    memcpy(var19, (double[]){0.08888888888888889, 0.0, 0.0, 0.6, 0.3111111111111111, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.07692307692307693, 0.9230769230769231, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.024411982856690884) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.76, 0.24, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.9213973799126638, 0.07860262008733625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= -0.888898104429245) {
                            if (input[2] <= -0.0700572319328785) {
                                if (input[2] <= -0.7734555602073669) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.92, 0.0, 0.08, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.044870562851428986) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.7872340425531915, 0.02127659574468085, 0.19148936170212766, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 1.0978825688362122) {
                                if (input[3] <= 1.911998689174652) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.06693711967545639, 0.24746450304259635, 0.6855983772819473, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.016736401673640166, 0.016736401673640166, 0.9665271966527197, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.5586385726928711) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.8461538461538461, 0.15384615384615385, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[1] <= -0.3492048531770706) {
                    if (input[7] <= -0.9730212092399597) {
                        if (input[0] <= 1.4409555196762085) {
                            if (input[2] <= 1.6692789196968079) {
                                if (input[8] <= -0.5675517320632935) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.9203539823008849, 0.008849557522123894, 0.07079646017699115, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.42857142857142855, 0.5714285714285714, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= -0.7976358532905579) {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.748281717300415) {
                                    memcpy(var19, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= -0.2623962163925171) {
                            if (input[3] <= 0.9844189882278442) {
                                if (input[0] <= -0.48914776742458344) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.15789473684210525, 0.4342105263157895, 0.013157894736842105, 0.0, 0.39473684210526316, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.015267175572519083, 0.0, 0.04580152671755725, 0.7938931297709924, 0.0, 0.0, 0.1450381679389313, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.1287505626678467) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.026066350710900472, 0.14928909952606634, 0.8246445497630331, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.4163621515035629) {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= 0.05045481026172638) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.6341463414634146, 0.36585365853658536, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[2] <= 1.5620986223220825) {
                        if (input[2] <= -1.1009349822998047) {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[6] <= 2.0550248622894287) {
                                if (input[3] <= -0.31789517402648926) {
                                    memcpy(var19, (double[]){0.0016025641025641025, 0.0, 0.0, 0.0, 0.0, 0.035256410256410256, 0.9631410256410257, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.6294779938587513, 0.3705220061412487, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -0.13795031607151031) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.027777777777777776, 0.9722222222222222, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= -0.2786127645522356) {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[3] <= 1.4729570150375366) {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.2462174966931343) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.3333333333333333, 0.6666666666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[7] <= -0.9295806586742401) {
                memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            } else {
                if (input[0] <= 1.7475314736366272) {
                    if (input[2] <= -1.040424793958664) {
                        if (input[7] <= -0.5107723772525787) {
                            memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                } else {
                    memcpy(var19, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        }
    } else {
        if (input[8] <= 1.5109493732452393) {
            if (input[2] <= -1.9349823594093323) {
                if (input[4] <= -0.929171085357666) {
                    if (input[1] <= 0.7968886196613312) {
                        if (input[5] <= 1.2761791422963142) {
                            memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[0] <= -0.26979807019233704) {
                            memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[9] <= -0.0024456828832626343) {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            } else {
                if (input[5] <= 0.03019119519740343) {
                    if (input[8] <= 1.2259083986282349) {
                        if (input[9] <= 0.4782767593860626) {
                            if (input[4] <= -1.8424713015556335) {
                                memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.7389917373657227) {
                                    memcpy(var19, (double[]){0.0, 0.021052631578947368, 0.0, 0.0, 0.0, 0.0, 0.9789473684210527, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[7] <= 1.3620495200157166) {
                            if (input[2] <= -1.4218870401382446) {
                                memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.31059932708740234) {
                                if (input[2] <= -1.336899757385254) {
                                    memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.38095238095238093, 0.0, 0.0, 0.0, 0.0, 0.6190476190476191, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -0.9236575365066528) {
                                    memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[4] <= -1.525465726852417) {
                        if (input[1] <= 1.1338465809822083) {
                            if (input[4] <= -1.7960657477378845) {
                                memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[4] <= -0.7960702478885651) {
                            if (input[9] <= -0.02003066660836339) {
                                if (input[8] <= 1.4173864722251892) {
                                    memcpy(var19, (double[]){0.0, 0.013157894736842105, 0.0, 0.0, 0.0, 0.868421052631579, 0.11842105263157894, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.36363636363636365, 0.6363636363636364, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 1.3902328610420227) {
                                    memcpy(var19, (double[]){0.0, 0.07692307692307693, 0.0, 0.0, 0.0, 0.07692307692307693, 0.8461538461538461, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[2] <= -1.0347340106964111) {
                if (input[4] <= -1.0216337442398071) {
                    if (input[4] <= -1.674616515636444) {
                        memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[4] <= -1.6712212562561035) {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[2] <= -1.3050435781478882) {
                                memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= 1.738906979560852) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.9565217391304348, 0.0, 0.0, 0.0, 0.0, 0.043478260869565216, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            } else {
                if (input[6] <= 1.9325799942016602) {
                    if (input[8] <= 2.343950629234314) {
                        if (input[4] <= -1.1130178570747375) {
                            if (input[9] <= -0.11009693518280983) {
                                if (input[7] <= 1.4758980870246887) {
                                    memcpy(var19, (double[]){0.0, 0.36363636363636365, 0.0, 0.0, 0.0, 0.09090909090909091, 0.5454545454545454, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.6111111111111112, 0.0, 0.0, 0.0, 0.3333333333333333, 0.05555555555555555, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 0.5378368049860001) {
                                    memcpy(var19, (double[]){0.0, 0.9782608695652174, 0.0, 0.0, 0.0, 0.0, 0.021739130434782608, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -0.8978446125984192) {
                                if (input[5] <= 0.283515153452754) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9047619047619048, 0.09523809523809523, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[4] <= -1.0107527375221252) {
                            memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[4] <= -1.3848267197608948) {
                        memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[8] <= 2.221264600753784) {
                            if (input[7] <= 1.72149258852005) {
                                memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= -0.8023729026317596) {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var19, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var19, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        }
    }
    add_vectors(var12, var19, 8, var11);
    double var20[8];
    if (input[8] <= 0.08627868443727493) {
        if (input[3] <= -0.21243371069431305) {
            if (input[7] <= -0.7509579658508301) {
                if (input[9] <= 0.9682269990444183) {
                    if (input[2] <= 1.648528516292572) {
                        if (input[7] <= -0.8209700584411621) {
                            if (input[9] <= -0.6359446346759796) {
                                if (input[2] <= 0.8361948728561401) {
                                    memcpy(var20, (double[]){0.8412698412698413, 0.0, 0.07936507936507936, 0.0, 0.0, 0.0, 0.07936507936507936, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.14285714285714285, 0.0, 0.14285714285714285, 0.0, 0.0, 0.0, 0.7142857142857143, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.10912135988473892) {
                                    memcpy(var20, (double[]){0.9306049822064058, 0.0, 0.014234875444839859, 0.0, 0.0, 0.0, 0.05516014234875446, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.9910233393177738, 0.0, 0.0017953321364452424, 0.0, 0.0, 0.0, 0.00718132854578097, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.5949791371822357) {
                                if (input[9] <= -0.15248770266771317) {
                                    memcpy(var20, (double[]){0.26666666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.8947368421052632, 0.0, 0.0, 0.0, 0.0, 0.0, 0.10526315789473684, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5748494267463684) {
                                    memcpy(var20, (double[]){0.9538461538461539, 0.0, 0.0, 0.0, 0.0, 0.0, 0.046153846153846156, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.6049225032329559) {
                            memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[0] <= 1.2973264157772064) {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[4] <= -0.19301799684762955) {
                    if (input[5] <= 0.7514177858829498) {
                        if (input[7] <= -0.09708017110824585) {
                            if (input[3] <= -0.3100205808877945) {
                                if (input[8] <= -0.5432179272174835) {
                                    memcpy(var20, (double[]){0.0916030534351145, 0.0, 0.007633587786259542, 0.0, 0.0, 0.0, 0.46564885496183206, 0.4351145038167939}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06451612903225806, 0.9354838709677419}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 0.2652163552120328) {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= -0.5773603022098541) {
                                if (input[8] <= -0.6095998287200928) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.041666666666666664, 0.9583333333333334}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.75, 0.25}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.6398764550685883) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.013888888888888888, 0.9861111111111112}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[1] <= -1.0915766954421997) {
                        if (input[0] <= 1.4817304015159607) {
                            if (input[9] <= 0.5927645079791546) {
                                if (input[0] <= 0.6201501339673996) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= -1.0760449767112732) {
                                if (input[5] <= -1.1477357149124146) {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.7235934138298035) {
                                    memcpy(var20, (double[]){0.9166666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[9] <= 0.9632912278175354) {
                            if (input[1] <= -0.5024502873420715) {
                                if (input[1] <= -0.8177010416984558) {
                                    memcpy(var20, (double[]){0.37037037037037035, 0.0, 0.012345679012345678, 0.024691358024691357, 0.0, 0.0, 0.5925925925925926, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.136986301369863, 0.0, 0.0, 0.1095890410958904, 0.0, 0.0, 0.7534246575342466, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.8429907560348511) {
                                    memcpy(var20, (double[]){0.00682261208576998, 0.0, 0.0, 0.008771929824561403, 0.0, 0.0, 0.9844054580896686, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= -1.020409107208252) {
                                memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        } else {
            if (input[2] <= -0.135037861764431) {
                if (input[7] <= -0.8049652874469757) {
                    if (input[9] <= 0.005954118387307972) {
                        if (input[1] <= -0.5926024615764618) {
                            if (input[3] <= -0.1290324330329895) {
                                if (input[7] <= -0.9366175532341003) {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 2.0712618827819824) {
                                    memcpy(var20, (double[]){0.007339449541284404, 0.0, 0.9871559633027523, 0.001834862385321101, 0.003669724770642202, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.4, 0.0, 0.6, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 0.40299391746520996) {
                                if (input[9] <= -0.28055350482463837) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.1, 0.9, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[1] <= -0.13157374411821365) {
                            if (input[0] <= 1.2355075478553772) {
                                if (input[1] <= -0.5312183797359467) {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[1] <= -0.8005745112895966) {
                        if (input[3] <= 1.3048095703125) {
                            if (input[9] <= -0.7287921011447906) {
                                if (input[0] <= -0.8778518736362457) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.43945273756980896) {
                                    memcpy(var20, (double[]){0.17647058823529413, 0.0, 0.6470588235294118, 0.058823529411764705, 0.11764705882352941, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.28, 0.72, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.8587582111358643) {
                                if (input[2] <= -0.3663654774427414) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.9333333333333333, 0.0, 0.06666666666666667, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.2631578947368421, 0.05263157894736842, 0.6842105263157895, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.43969494104385376) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.1016244292259216) {
                            if (input[7] <= -0.6968771517276764) {
                                if (input[5] <= -0.29370178654789925) {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.16585476696491241) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.2, 0.0, 0.0, 0.6, 0.0, 0.0, 0.0, 0.2}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 0.6820918321609497) {
                                if (input[1] <= 0.9682653546333313) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.028708133971291867, 0.07177033492822966, 0.8995215311004785, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.19884444773197174) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.08333333333333333, 0.8333333333333334, 0.08333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[3] <= 1.3620491027832031) {
                    if (input[3] <= 0.6165242493152618) {
                        if (input[3] <= -0.08022863790392876) {
                            if (input[0] <= 1.3875654935836792) {
                                if (input[6] <= 1.808624029159546) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.09016393442622951, 0.9098360655737705, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= -0.7893567383289337) {
                                if (input[8] <= -0.5829031765460968) {
                                    memcpy(var20, (double[]){0.05309734513274336, 0.0, 0.8495575221238938, 0.09734513274336283, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0625, 0.9375, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.6022305488586426) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.06493506493506493, 0.935064935064935, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.002386634844868735, 0.9976133651551312, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.5929325222969055) {
                            if (input[7] <= -0.5989597737789154) {
                                if (input[9] <= 0.2233646884560585) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.9391771019677997, 0.03398926654740608, 0.026833631484794274, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 0.9821730256080627) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.031914893617021274, 0.9042553191489362, 0.06382978723404255, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.017241379310344827, 0.5, 0.4827586206896552, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -1.0792887210845947) {
                                if (input[9] <= -0.4878014624118805) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.8095238095238095, 0.0, 0.19047619047619047, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.1111111111111111, 0.2222222222222222, 0.6666666666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.1986774802207947) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.046511627906976744, 0.8953488372093024, 0.05813953488372093, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.34375, 0.65625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[9] <= -0.29325875639915466) {
                        if (input[9] <= -1.1179354190826416) {
                            if (input[10] <= 1.6644272953271866) {
                                if (input[8] <= -0.5880641937255859) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.40625, 0.25, 0.34375, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= -0.8884547650814056) {
                                if (input[8] <= -0.5741256177425385) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.7935779816513762, 0.013761467889908258, 0.1926605504587156, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.13636363636363635, 0.13636363636363635, 0.7272727272727273, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.6600736081600189) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.045647558386411886, 0.2229299363057325, 0.7314225053078556, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.72, 0.28, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -0.1793099269270897) {
                            if (input[6] <= -1.3301841020584106) {
                                if (input[0] <= -0.21497640758752823) {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.75, 0.25, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -1.0894652605056763) {
                                    memcpy(var20, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.023178807947019868, 0.09933774834437085, 0.8774834437086093, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= -1.073070764541626) {
                                if (input[0] <= 0.5522189736366272) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 0.18591617792844772) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.2826086956521739, 0.717391304347826, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[9] <= 0.05602297931909561) {
            if (input[2] <= -1.9844074249267578) {
                if (input[1] <= 0.9836111068725586) {
                    if (input[4] <= -1.5827144384384155) {
                        memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[9] <= -0.7341196238994598) {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[7] <= 1.2697873711585999) {
                            if (input[8] <= 2.0670776963233948) {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -0.5077808201313019) {
                                if (input[2] <= -2.11604642868042) {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.8888888888888888, 0.0, 0.0, 0.0, 0.0, 0.1111111111111111, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[5] <= 0.02459990233182907) {
                    if (input[8] <= 1.7225590348243713) {
                        if (input[8] <= 1.3000604510307312) {
                            if (input[5] <= -0.9804022014141083) {
                                if (input[6] <= 0.8427324295043945) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 1.5826762914657593) {
                                    memcpy(var20, (double[]){0.0, 0.03614457831325301, 0.0, 0.0, 0.0, 0.0, 0.963855421686747, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= -0.7357580661773682) {
                                if (input[9] <= -0.06310779042541981) {
                                    memcpy(var20, (double[]){0.0, 0.9166666666666666, 0.0, 0.0, 0.0, 0.0, 0.08333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -2.0292815566062927) {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[2] <= -1.0526719093322754) {
                            memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[5] <= -0.23701263964176178) {
                                if (input[2] <= -1.0062075555324554) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.85, 0.0, 0.0, 0.0, 0.0, 0.15, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -0.40104955434799194) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[6] <= 3.3170024156570435) {
                        if (input[4] <= -1.5506106615066528) {
                            if (input[9] <= -0.541089802980423) {
                                if (input[5] <= 0.2629263252019882) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 1.3153916597366333) {
                                    memcpy(var20, (double[]){0.0, 0.7142857142857143, 0.0, 0.0, 0.0, 0.0, 0.2857142857142857, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 0.5638143718242645) {
                                if (input[9] <= -0.32632458209991455) {
                                    memcpy(var20, (double[]){0.0, 0.008771929824561403, 0.0, 0.0, 0.0, 0.9473684210526315, 0.043859649122807015, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.017241379310344827, 0.0, 0.0, 0.0, 0.46551724137931033, 0.5172413793103449, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.39221353828907013) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9906191369606003, 0.009380863039399626, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[8] <= 1.1280606389045715) {
                if (input[2] <= -1.328406810760498) {
                    if (input[4] <= -0.5754826972261071) {
                        memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[5] <= 0.587584525346756) {
                        if (input[9] <= 0.6425813734531403) {
                            if (input[4] <= -0.6226125061511993) {
                                if (input[7] <= 1.7645266652107239) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[4] <= -1.1253856718540192) {
                            if (input[2] <= -0.1681465208530426) {
                                memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[2] <= 0.3648717701435089) {
                    if (input[7] <= 1.1822636723518372) {
                        if (input[6] <= -0.5791153609752655) {
                            memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[4] <= -1.4665364623069763) {
                                memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= 1.6188960075378418) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.2631578947368421, 0.7368421052631579, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -0.9541381597518921) {
                            if (input[2] <= -0.7086319327354431) {
                                if (input[8] <= 1.8584471344947815) {
                                    memcpy(var20, (double[]){0.0, 0.9778325123152709, 0.0, 0.0, 0.0, 0.0, 0.022167487684729065, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.6292731165885925) {
                                    memcpy(var20, (double[]){0.0, 0.9954545454545455, 0.0, 0.0, 0.0, 0.0, 0.004545454545454545, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.5641025641025641, 0.0, 0.0, 0.0, 0.05128205128205128, 0.38461538461538464, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 0.6625089943408966) {
                                memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.5267308354377747) {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.75, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[4] <= -0.7760290205478668) {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var20, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        }
    }
    add_vectors(var11, var20, 8, var10);
    double var21[8];
    if (input[7] <= 0.7622575759887695) {
        if (input[1] <= -0.5885944664478302) {
            if (input[3] <= -0.17653663456439972) {
                if (input[7] <= -0.5955629050731659) {
                    if (input[0] <= 1.4213103652000427) {
                        if (input[0] <= 0.7430481910705566) {
                            if (input[8] <= -0.5856760144233704) {
                                if (input[9] <= 0.4848165921866894) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.9130434782608696, 0.04347826086956522, 0.0, 0.0, 0.04347826086956522, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.36564116925001144) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.375, 0.0, 0.0, 0.625, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 1.6606711745262146) {
                                if (input[3] <= -0.6047462821006775) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9230769230769231, 0.07692307692307693}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[0] <= 1.5130726099014282) {
                            if (input[0] <= 1.4875732064247131) {
                                if (input[0] <= 1.4257997274398804) {
                                    memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.7560975609756098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.24390243902439024, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.6343057006597519) {
                                    memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.125, 0.0, 0.0, 0.0, 0.0, 0.0, 0.875, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.5625199377536774) {
                                if (input[3] <= -0.5636691749095917) {
                                    memcpy(var21, (double[]){0.9912891986062717, 0.0, 0.0, 0.0, 0.0, 0.0, 0.008710801393728223, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.3333333333333333, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= 0.7622047662734985) {
                        if (input[6] <= -1.6433808207511902) {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[0] <= 1.7518141865730286) {
                                if (input[5] <= -1.2325745224952698) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.04, 0.0, 0.0, 0.072, 0.0, 0.0, 0.888, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[3] <= 1.7198277711868286) {
                    if (input[1] <= -1.459713876247406) {
                        if (input[0] <= 1.8714988827705383) {
                            memcpy(var21, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[4] <= -0.3190331310033798) {
                                memcpy(var21, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= -0.5851059257984161) {
                            if (input[7] <= -0.660170167684555) {
                                if (input[7] <= -0.8045640885829926) {
                                    memcpy(var21, (double[]){0.017475728155339806, 0.0, 0.9660194174757282, 0.006796116504854369, 0.009708737864077669, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.02857142857142857, 0.0, 0.6571428571428571, 0.1, 0.21428571428571427, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 0.423837348818779) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.05829596412556055, 0.5246636771300449, 0.41704035874439466, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.16666666666666666, 0.8, 0.03333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= -0.9211934506893158) {
                                if (input[1] <= -1.1408485174179077) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.7580576837062836) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.03125, 0.875, 0.09375, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0851063829787234, 0.5, 0.4148936170212766, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[1] <= -0.5943881571292877) {
                        if (input[1] <= -1.4602854251861572) {
                            memcpy(var21, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[9] <= -0.41878606379032135) {
                                if (input[6] <= 0.7027431428432465) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.1640625, 0.0703125, 0.765625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.8666666666666667, 0.0, 0.13333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.5770410597324371) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.025, 0.04375, 0.93125, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[2] <= 1.1233618557453156) {
                            if (input[1] <= -0.5921925604343414) {
                                memcpy(var21, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[3] <= -0.29942587018013) {
                if (input[2] <= 1.5182549953460693) {
                    if (input[8] <= -0.5149337351322174) {
                        if (input[9] <= 0.9632912278175354) {
                            if (input[0] <= 1.413098394870758) {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= 1.5981350541114807) {
                                    memcpy(var21, (double[]){0.5652173913043478, 0.0, 0.0, 0.0, 0.0, 0.0, 0.43478260869565216, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.501084104180336) {
                                if (input[1] <= -0.5027662813663483) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[5] <= 0.3031534403562546) {
                            if (input[8] <= -0.16634000837802887) {
                                if (input[9] <= 0.8438712358474731) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.5283417142927647) {
                                if (input[8] <= 1.180863618850708) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.018518518518518517, 0.9814814814814815, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= 0.179403156042099) {
                        memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[7] <= -1.0676272511482239) {
                    memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[1] <= 0.0987926609814167) {
                        if (input[2] <= -0.1251508966088295) {
                            if (input[6] <= -1.0090699195861816) {
                                if (input[3] <= 1.9999027252197266) {
                                    memcpy(var21, (double[]){0.1111111111111111, 0.0, 0.0, 0.8888888888888888, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.5937883853912354) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.23170731707317074, 0.7682926829268293, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.1754959225654602) {
                                if (input[3] <= -0.25115320086479187) {
                                    memcpy(var21, (double[]){0.5909090909090909, 0.0, 0.0, 0.36363636363636365, 0.0, 0.0, 0.045454545454545456, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.006263048016701462, 0.0, 0.0, 0.9561586638830898, 0.037578288100208766, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.8904876112937927) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.3319327731092437, 0.6680672268907563, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.033210332103321034, 0.966789667896679, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= -0.7704660296440125) {
                            if (input[8] <= -0.5673422813415527) {
                                if (input[5] <= 0.015512054553255439) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.1956521739130435, 0.8043478260869565, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.1, 0.0, 0.0, 0.4, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 2.025948464870453) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 0.42332611978054047) {
                                if (input[7] <= 0.06039486825466156) {
                                    memcpy(var21, (double[]){0.0038095238095238095, 0.0, 0.0, 0.5923809523809523, 0.4, 0.0, 0.0, 0.0038095238095238095}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.847457627118644, 0.15254237288135594, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 0.7365300357341766) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.967741935483871, 0.03225806451612903, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.75, 0.25, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[2] <= -1.2252402305603027) {
            if (input[7] <= 1.213102102279663) {
                if (input[6] <= 0.7928929924964905) {
                    if (input[0] <= -0.7607814073562622) {
                        if (input[3] <= -0.8066978752613068) {
                            if (input[5] <= 0.6333504915237427) {
                                memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[4] <= -0.8941502571105957) {
                            if (input[5] <= -0.31600843369960785) {
                                memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.0866191983222961) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[9] <= 0.9382820352911949) {
                        memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[4] <= -1.1357589364051819) {
                    if (input[0] <= -0.6333020031452179) {
                        if (input[1] <= 0.5467861145734787) {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[5] <= 2.157300293445587) {
                                if (input[1] <= 0.8638796210289001) {
                                    memcpy(var21, (double[]){0.0, 0.9375, 0.0, 0.0, 0.0, 0.0, 0.0625, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= 1.3024083971977234) {
                            if (input[4] <= -1.5602359771728516) {
                                memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= 0.9914793372154236) {
                                    memcpy(var21, (double[]){0.0, 0.6, 0.0, 0.0, 0.0, 0.2, 0.2, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= -0.45629996061325073) {
                                if (input[8] <= 1.3637390732765198) {
                                    memcpy(var21, (double[]){0.0, 0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.9864864864864865, 0.0, 0.0, 0.0, 0.0, 0.013513513513513514, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[5] <= -0.03885538876056671) {
                        if (input[2] <= -1.2985384464263916) {
                            memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[4] <= -0.833441972732544) {
                            if (input[5] <= 0.8103601783514023) {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[9] <= 0.16518711298704147) {
                if (input[9] <= -0.08039611205458641) {
                    if (input[0] <= -0.9017030596733093) {
                        if (input[9] <= -0.6626139283180237) {
                            if (input[4] <= -1.2227451801300049) {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= -0.00799562968313694) {
                                if (input[1] <= 1.5214600563049316) {
                                    memcpy(var21, (double[]){0.0, 0.21428571428571427, 0.0, 0.0, 0.0, 0.0, 0.7857142857142857, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.553853154182434) {
                                    memcpy(var21, (double[]){0.0, 0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9975786924939467, 0.002421307506053269, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= -0.44373516738414764) {
                            if (input[4] <= -0.8346797823905945) {
                                if (input[8] <= 1.7017998695373535) {
                                    memcpy(var21, (double[]){0.0, 0.04347826086956522, 0.0, 0.0, 0.0, 0.06521739130434784, 0.891304347826087, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.7058823529411765, 0.0, 0.0, 0.0, 0.058823529411764705, 0.23529411764705882, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.14211413264274597) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -1.0897589921951294) {
                                if (input[5] <= 0.8465688228607178) {
                                    memcpy(var21, (double[]){0.0, 0.36082474226804123, 0.0, 0.0, 0.0, 0.020618556701030927, 0.6185567010309279, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.5569243431091309) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9601449275362319, 0.03985507246376811, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[0] <= -1.0997390747070312) {
                        if (input[2] <= -0.6061297953128815) {
                            if (input[4] <= -1.1337652802467346) {
                                if (input[6] <= 2.0020177364349365) {
                                    memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[4] <= -0.6822532713413239) {
                            if (input[6] <= 2.1514899730682373) {
                                if (input[4] <= -1.7486361265182495) {
                                    memcpy(var21, (double[]){0.0, 0.8235294117647058, 0.0, 0.0, 0.0, 0.0, 0.17647058823529413, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.01639344262295082, 0.0, 0.0, 0.0, 0.09836065573770492, 0.8852459016393442, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= -0.07668400183320045) {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[5] <= 0.013356515439227223) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[8] <= 0.9714582562446594) {
                    if (input[8] <= -0.11155840754508972) {
                        memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    } else {
                        if (input[8] <= 0.9122881293296814) {
                            if (input[7] <= 1.4085175395011902) {
                                if (input[4] <= -1.0981681048870087) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.9095664322376251) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.5789473684210527, 0.0, 0.0, 0.0, 0.3684210526315789, 0.05263157894736842, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.8041445910930634) {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= 0.4847719371318817) {
                        if (input[8] <= 1.5643817782402039) {
                            if (input[0] <= -0.7750467956066132) {
                                if (input[8] <= 1.4454950094223022) {
                                    memcpy(var21, (double[]){0.0, 0.6923076923076923, 0.0, 0.0, 0.0, 0.2692307692307692, 0.038461538461538464, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 0.2, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.872346818447113) {
                                    memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.15384615384615385, 0.0, 0.0, 0.0, 0.19230769230769232, 0.6538461538461539, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 1.3530035614967346) {
                                if (input[5] <= 1.0195121765136719) {
                                    memcpy(var21, (double[]){0.0, 0.9850746268656716, 0.0, 0.0, 0.0, 0.0, 0.014925373134328358, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 0.75, 0.0, 0.0, 0.0, 0.25, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[9] <= 0.5747431218624115) {
                            if (input[9] <= 0.5633586943149567) {
                                if (input[8] <= 1.4897229671478271) {
                                    memcpy(var21, (double[]){0.0, 0.6666666666666666, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -0.9236575365066528) {
                                memcpy(var21, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var21, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var10, var21, 8, var9);
    double var22[8];
    if (input[0] <= 1.4217281341552734) {
        if (input[3] <= -0.3138073980808258) {
            if (input[1] <= 0.7026866972446442) {
                if (input[8] <= -0.5172189772129059) {
                    if (input[7] <= -0.013742153532803059) {
                        if (input[9] <= 0.8735681474208832) {
                            if (input[7] <= -1.0991952419281006) {
                                memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.3894304782152176) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.00909090909090909, 0.0, 0.0, 0.0, 0.990909090909091, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[0] <= -0.3991300165653229) {
                            if (input[1] <= -0.17018155753612518) {
                                if (input[9] <= 0.32793229818344116) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= 0.6565623581409454) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.04225352112676056, 0.9577464788732394}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.6666666666666666}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 0.40974634885787964) {
                                if (input[1] <= -0.06920656934380531) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05263157894736842, 0.9473684210526315}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6101694915254238, 0.3898305084745763}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5685504674911499) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3076923076923077, 0.6923076923076923}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[8] <= 0.08627868443727493) {
                        if (input[5] <= 0.4445241242647171) {
                            if (input[6] <= 1.6990715265274048) {
                                if (input[7] <= -0.33824320137500763) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2196078431372549, 0.7803921568627451}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07846153846153846, 0.9215384615384615}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 0.36140768229961395) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.75}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8888888888888888, 0.1111111111111111}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 0.3275126516819) {
                                if (input[9] <= 0.3619290590286255) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.5139257460832596) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= 0.15572243183851242) {
                            if (input[9] <= -0.6585586071014404) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[8] <= 1.5572431683540344) {
                    if (input[9] <= 0.5213499665260315) {
                        if (input[4] <= -1.0144082903862) {
                            if (input[7] <= 1.3417073488235474) {
                                if (input[5] <= 0.9173557162284851) {
                                    memcpy(var22, (double[]){0.0, 0.12962962962962962, 0.0, 0.0, 0.0, 0.037037037037037035, 0.8333333333333334, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.8291656970977783) {
                                    memcpy(var22, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.21666666666666667, 0.0, 0.0, 0.0, 0.21666666666666667, 0.5666666666666667, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= -0.016325658187270164) {
                                if (input[8] <= -0.053186699748039246) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9827751196172249, 0.01722488038277512, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 0.9007178843021393) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.7619047619047619, 0.23809523809523808, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -1.1114650964736938) {
                            if (input[8] <= 0.06527319550514221) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.3635712265968323) {
                                    memcpy(var22, (double[]){0.0, 0.9130434782608695, 0.0, 0.0, 0.0, 0.0, 0.08695652173913043, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= 0.46864667534828186) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= 0.6753579676151276) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[5] <= 1.2557232975959778) {
                        if (input[2] <= 0.3252481073141098) {
                            if (input[8] <= 2.0174400806427) {
                                if (input[5] <= 0.8946106433868408) {
                                    memcpy(var22, (double[]){0.0, 0.8815261044176707, 0.0, 0.0, 0.0, 0.05220883534136546, 0.06626506024096386, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.4897959183673469, 0.0, 0.0, 0.0, 0.5102040816326531, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.6292048990726471) {
                                    memcpy(var22, (double[]){0.0, 0.125, 0.0, 0.0, 0.0, 0.875, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.9792746113989638, 0.0, 0.0, 0.0, 0.019430051813471502, 0.0012953367875647669, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -0.5924822688102722) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[4] <= -1.4886049032211304) {
                            memcpy(var22, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[8] <= -0.5932329893112183) {
                if (input[1] <= -0.5937651693820953) {
                    if (input[0] <= 0.7912136018276215) {
                        if (input[3] <= 1.676256537437439) {
                            if (input[7] <= -0.582628071308136) {
                                if (input[3] <= -0.2354057878255844) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.6, 0.4, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.9618320610687023, 0.022137404580152672, 0.01603053435114504, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 0.9610661566257477) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.03571428571428571, 0.9404761904761905, 0.023809523809523808, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.10465116279069768, 0.18604651162790697, 0.7093023255813954, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.9037236273288727) {
                                if (input[8] <= -0.5974843502044678) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.9859154929577465, 0.0, 0.014084507042253521, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.7142857142857143, 0.0, 0.2857142857142857, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.5864346027374268) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.39344262295081966, 0.06557377049180328, 0.5409836065573771, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.16494845360824742, 0.8350515463917526, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.7169528603553772) {
                            if (input[5] <= -1.0360844731330872) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= 1.3670933842658997) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.88, 0.05333333333333334, 0.06666666666666667, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.7142857142857143, 0.0, 0.2857142857142857, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.8328216373920441) {
                                if (input[0] <= 1.090895175933838) {
                                    memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.3333333333333333, 0.0, 0.6666666666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.0962378941476345) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.125, 0.0, 0.875, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= 1.143385648727417) {
                        if (input[4] <= 0.5227775573730469) {
                            if (input[9] <= 0.3857685625553131) {
                                if (input[3] <= 1.1317260265350342) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[1] <= -0.5861882567405701) {
                                if (input[7] <= -0.35924339666962624) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 0.8375314474105835) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.6764705882352942, 0.3235294117647059, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= -1.2695669531822205) {
                            if (input[0] <= 0.35720574855804443) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.3950451612472534) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.4, 0.6, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 0.2711096853017807) {
                                if (input[3] <= 1.911998689174652) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.32196969696969696, 0.678030303030303, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.8866963386535645) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.1588785046728972, 0.8411214953271028, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.01818181818181818, 0.9818181818181818, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[7] <= -1.0067636668682098) {
                    if (input[1] <= -0.5391291975975037) {
                        if (input[8] <= -0.5674261152744293) {
                            if (input[9] <= -0.523066520690918) {
                                memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= -0.5014262348413467) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.9444444444444444, 0.0, 0.05555555555555555, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.8022071868181229) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[9] <= -0.7591288089752197) {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[7] <= -0.2804567515850067) {
                        if (input[1] <= 0.14449884742498398) {
                            if (input[7] <= -0.7886188626289368) {
                                if (input[4] <= -0.8854686617851257) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.8333333333333334, 0.16666666666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.1393939393939394, 0.2, 0.6606060606060606, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.2406046763062477) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.008264462809917356, 0.4727272727272727, 0.5190082644628099, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.28484848484848485, 0.7151515151515152, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.115447461605072) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= 0.509007453918457) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.6352941176470588, 0.36470588235294116, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.2962962962962963, 0.7037037037037037, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[2] <= -0.12587570399045944) {
                            if (input[7] <= 0.8638950809836388) {
                                if (input[6] <= -0.7119841873645782) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.06896551724137931, 0.9310344827586207, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var22, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[0] <= 0.39027775824069977) {
                                if (input[0] <= -0.8806962072849274) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.5434782608695652, 0.45652173913043476, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.7789473684210526, 0.22105263157894736, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.513478696346283) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.825, 0.175, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.34285714285714286, 0.6571428571428571, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[8] <= -0.589418351650238) {
            if (input[7] <= -0.4738361984491348) {
                if (input[2] <= 0.8077331781387329) {
                    if (input[3] <= 0.04828743450343609) {
                        if (input[5] <= -1.309943974018097) {
                            if (input[9] <= -1.0115524232387543) {
                                memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var22, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= -0.5931086242198944) {
                                if (input[1] <= -0.9253728985786438) {
                                    memcpy(var22, (double[]){0.9929292929292929, 0.0, 0.0, 0.0, 0.0, 0.0, 0.007070707070707071, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.9639830508474576, 0.0, 0.0, 0.0, 0.0, 0.0, 0.036016949152542374, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.5169594883918762) {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.9130434782608695, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08695652173913043, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[2] <= 0.2818208783864975) {
                            if (input[3] <= 1.7393620014190674) {
                                if (input[4] <= 0.33624518662691116) {
                                    memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.2, 0.0, 0.8, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[3] <= 0.44930219650268555) {
                        if (input[9] <= -0.6427811086177826) {
                            if (input[10] <= 1.6644272953271866) {
                                memcpy(var22, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var22, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[6] <= -1.0304893255233765) {
                            memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[4] <= 0.26387645304203033) {
                                memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= 0.46541546285152435) {
                                    memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[7] <= -0.38982081413269043) {
                    if (input[6] <= 0.22066620737314224) {
                        memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[4] <= 0.6811634600162506) {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[4] <= 0.35613687336444855) {
                        if (input[0] <= 1.5687979459762573) {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[3] <= 1.6127384305000305) {
                if (input[0] <= 1.6320722699165344) {
                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[5] <= -0.3465338796377182) {
                        memcpy(var22, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[8] <= -0.5797703266143799) {
                    if (input[4] <= 0.44539472460746765) {
                        memcpy(var22, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    memcpy(var22, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        }
    }
    add_vectors(var9, var22, 8, var8);
    double var23[8];
    if (input[3] <= -0.21080586314201355) {
        if (input[4] <= -1.5521445870399475) {
            if (input[4] <= -1.8260714411735535) {
                memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            } else {
                if (input[8] <= 1.5895297527313232) {
                    if (input[7] <= 1.633435606956482) {
                        if (input[2] <= 0.19179292768239975) {
                            if (input[7] <= 0.4380071684718132) {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            } else {
                                if (input[1] <= 1.51975679397583) {
                                    memcpy(var23, (double[]){0.0, 0.029411764705882353, 0.0, 0.0, 0.0, 0.0, 0.9705882352941176, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.8, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= 0.1983765959739685) {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= 1.1817296743392944) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[2] <= -1.0255753695964813) {
                            memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[9] <= -0.226052887737751) {
                        if (input[8] <= 2.1410452127456665) {
                            if (input[0] <= -0.7504498958587646) {
                                if (input[4] <= -1.6076601147651672) {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[9] <= 0.9682269990444183) {
                if (input[8] <= 0.08627868443727493) {
                    if (input[7] <= -0.740089476108551) {
                        if (input[0] <= 1.4213103652000427) {
                            if (input[2] <= 0.2672464996576309) {
                                if (input[7] <= -0.9274251163005829) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.7368421052631579, 0.0, 0.0, 0.0, 0.2631578947368421, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.08, 0.0, 0.0, 0.0, 0.92, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -0.7366026490926743) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.013333333333333334, 0.013333333333333334, 0.0, 0.0, 0.9733333333333334, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 1.4777389168739319) {
                                if (input[0] <= 1.4744534492492676) {
                                    memcpy(var23, (double[]){0.9298245614035088, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07017543859649122, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.7785096168518066) {
                                    memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.9761904761904762, 0.0, 0.0, 0.0, 0.0, 0.0, 0.023809523809523808, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= 1.2332080602645874) {
                            if (input[3] <= -0.39149753749370575) {
                                if (input[7] <= -0.5368000864982605) {
                                    memcpy(var23, (double[]){0.2581699346405229, 0.0, 0.006535947712418301, 0.0, 0.0, 0.0, 0.7352941176470589, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.011144883485309016, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9888551165146909, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.6056510508060455) {
                                    memcpy(var23, (double[]){0.7073170731707318, 0.0, 0.02439024390243903, 0.19512195121951223, 0.0, 0.0, 0.07317073170731708, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.03125, 0.0, 0.0, 0.96875, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.5946818888187408) {
                                if (input[3] <= -0.6189636588096619) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.5105954855680466) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.14285714285714285, 0.0, 0.0, 0.8571428571428571, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[5] <= 0.03019119519740343) {
                        if (input[8] <= 1.6438398957252502) {
                            if (input[2] <= -1.0680332779884338) {
                                if (input[1] <= 0.818239688873291) {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.38461538461538464, 0.0, 0.0, 0.0, 0.0, 0.6153846153846154, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -1.4124165177345276) {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.018292682926829267, 0.0, 0.0, 0.0, 0.0, 0.9817073170731707, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= -0.9164135158061981) {
                                if (input[2] <= -1.3618170022964478) {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.7857142857142857, 0.0, 0.0, 0.0, 0.0, 0.21428571428571427, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 1.578833281993866) {
                                    memcpy(var23, (double[]){0.0, 0.125, 0.0, 0.0, 0.0, 0.0, 0.875, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[9] <= 0.44237931072711945) {
                            if (input[4] <= -1.1167247295379639) {
                                if (input[8] <= 1.8596172332763672) {
                                    memcpy(var23, (double[]){0.0, 0.1111111111111111, 0.0, 0.0, 0.0, 0.5925925925925926, 0.2962962962962963, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.9515767693519592) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9642857142857143, 0.03571428571428571, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9958129797627355, 0.00418702023726448, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 1.0270575284957886) {
                                if (input[9] <= 0.48848405480384827) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[10] <= 1.6644272953271866) {
                                    memcpy(var23, (double[]){0.0, 0.9, 0.0, 0.0, 0.0, 0.05, 0.05, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[7] <= 1.0986967086791992) {
                    if (input[6] <= 1.5254451036453247) {
                        if (input[7] <= -0.9295806586742401) {
                            memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[2] <= -1.020409107208252) {
                                if (input[3] <= -0.6399961113929749) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[9] <= 1.0592223405838013) {
                            memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    memcpy(var23, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        }
    } else {
        if (input[0] <= 1.6220101118087769) {
            if (input[7] <= -0.8221052587032318) {
                if (input[9] <= -0.2953593581914902) {
                    if (input[2] <= 0.07915150746703148) {
                        if (input[4] <= 1.5373597145080566) {
                            if (input[1] <= -0.5303464084863663) {
                                if (input[8] <= -0.5636318922042847) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.9853420195439739, 0.006514657980456026, 0.008143322475570033, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.073388010263443) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.1, 0.9, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 1.2701640129089355) {
                                if (input[3] <= 1.7771834135055542) {
                                    memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[1] <= -0.5851514339447021) {
                            if (input[8] <= -0.5724914073944092) {
                                if (input[0] <= 0.3684844970703125) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.9840989399293286, 0.0088339222614841, 0.007067137809187279, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.9295774647887324, 0.0, 0.07042253521126761, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.3399493545293808) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.07692307692307693, 0.46153846153846156, 0.46153846153846156, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 0.9329458475112915) {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= -0.17998214811086655) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.4375, 0.5625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.10606060606060606, 0.8939393939393939, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= -1.0691749453544617) {
                        if (input[4] <= 0.8520781099796295) {
                            memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[0] <= 0.7616374639328569) {
                                memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[4] <= 0.8493045270442963) {
                            if (input[1] <= -0.5653124451637268) {
                                if (input[5] <= -1.312532126903534) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.014925373134328358, 0.0, 0.8059701492537313, 0.05970149253731343, 0.11940298507462686, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.2073993682861328) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.045454545454545456, 0.9545454545454546, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.38461538461538464, 0.6153846153846154, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.3568165302276611) {
                                if (input[8] <= -0.586248368024826) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.7, 0.3, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5456641614437103) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[2] <= -0.02896442450582981) {
                    if (input[3] <= 1.1015083193778992) {
                        if (input[1] <= -0.5647863447666168) {
                            if (input[1] <= -1.1216211318969727) {
                                if (input[7] <= -0.526025265455246) {
                                    memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.2, 0.6, 0.2, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.4169300049543381) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.75, 0.1, 0.15, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.16666666666666666, 0.8333333333333334, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.16197027266025543) {
                                if (input[6] <= -0.43826913088560104) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.38352224230766296) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.92, 0.08, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -1.4796035885810852) {
                            memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[6] <= 1.3097238540649414) {
                                if (input[1] <= 0.9682653546333313) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.06497175141242938, 0.0847457627118644, 0.8502824858757062, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= -0.39411817491054535) {
                        if (input[3] <= 1.3816151022911072) {
                            if (input[7] <= -0.6720232665538788) {
                                if (input[5] <= -0.13958203047513962) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.3333333333333333, 0.5357142857142857, 0.13095238095238096, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.5923706293106079) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.125, 0.765625, 0.109375, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.005067567567567568, 0.9611486486486487, 0.033783783783783786, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.3071294575929642) {
                                if (input[9] <= -0.437734454870224) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.03146067415730337, 0.17303370786516853, 0.7955056179775281, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.21875, 0.28125, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 2.0304830074310303) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.462882096069869, 0.537117903930131, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= -1.1017482280731201) {
                            if (input[4] <= 0.24326935410499573) {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= 0.5374886691570282) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.1, 0.3, 0.6, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.027777777777777776, 0.9444444444444444, 0.027777777777777776, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 0.6335396468639374) {
                                if (input[3] <= 1.0369570851325989) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.029850746268656716, 0.9328358208955224, 0.03731343283582089, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0016778523489932886, 0.2080536912751678, 0.790268456375839, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        } else {
            if (input[7] <= -0.6510219275951385) {
                if (input[5] <= -1.2887300252914429) {
                    if (input[0] <= 2.196460008621216) {
                        memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[1] <= -1.3903101086616516) {
                        if (input[6] <= -0.2697027139365673) {
                            if (input[7] <= -1.0041463375091553) {
                                memcpy(var23, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[1] <= -0.39103278517723083) {
                            if (input[2] <= 1.1720241904258728) {
                                memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= -0.21882207319140434) {
                                if (input[7] <= -0.7196953296661377) {
                                    memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 0.32790568470954895) {
                                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var23, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[5] <= -0.7139124870300293) {
                    if (input[6] <= -0.36426016688346863) {
                        memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var23, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    memcpy(var23, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        }
    }
    add_vectors(var8, var23, 8, var7);
    double var24[8];
    if (input[4] <= -1.5305246710777283) {
        if (input[4] <= -1.826335370540619) {
            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
        } else {
            if (input[0] <= -0.7248302698135376) {
                if (input[1] <= 0.7901163697242737) {
                    if (input[0] <= -0.9833396673202515) {
                        if (input[9] <= 2.1480948328971863) {
                            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[7] <= 1.142844796180725) {
                        memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[6] <= 1.923416793346405) {
                            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[7] <= 1.5954319834709167) {
                                if (input[3] <= -0.8425949513912201) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[1] <= 1.51975679397583) {
                    if (input[9] <= 0.31152838468551636) {
                        if (input[2] <= -1.7729926109313965) {
                            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[6] <= 1.8353644609451294) {
                                if (input[7] <= 1.739980399608612) {
                                    memcpy(var24, (double[]){0.0, 0.02, 0.0, 0.02, 0.0, 0.0, 0.96, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= 1.7127739191055298) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[2] <= 0.08342728577554226) {
                            if (input[4] <= -1.8229405283927917) {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= 0.9148505330085754) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.9555555555555556, 0.0, 0.0, 0.0, 0.0, 0.044444444444444446, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 1.6549677848815918) {
                                memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[6] <= -0.3583650141954422) {
                        if (input[6] <= -0.43181267380714417) {
                            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        }
    } else {
        if (input[8] <= 0.0719225388020277) {
            if (input[7] <= -0.7673909962177277) {
                if (input[3] <= -0.11956178024411201) {
                    if (input[0] <= 1.4217281341552734) {
                        if (input[2] <= -0.31717778742313385) {
                            if (input[9] <= 0.48384493216872215) {
                                memcpy(var24, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.649914413690567) {
                                if (input[7] <= -0.9884718656539917) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.8333333333333334, 0.0, 0.0, 0.0, 0.16666666666666666, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.07042253521126761, 0.11267605633802817, 0.0, 0.0, 0.8169014084507042, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[7] <= -0.7810522317886353) {
                            if (input[1] <= -0.9253620803356171) {
                                memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= -0.624052107334137) {
                                    memcpy(var24, (double[]){0.9578947368421052, 0.0, 0.0, 0.0, 0.0, 0.0, 0.042105263157894736, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.9970326409495549, 0.0, 0.0, 0.0, 0.0, 0.0, 0.002967359050445104, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 1.645772933959961) {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[1] <= -0.5915703773498535) {
                        if (input[9] <= 0.06496008113026619) {
                            if (input[0] <= 1.9476141333580017) {
                                if (input[8] <= -0.5674261152744293) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.9574036511156186, 0.010141987829614604, 0.032454361054766734, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.41935483870967744, 0.5806451612903226, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.6293609738349915) {
                                    memcpy(var24, (double[]){0.16666666666666666, 0.0, 0.8333333333333334, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= -0.7610934972763062) {
                                if (input[0] <= 0.7489086985588074) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.8919512629508972) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.125, 0.0, 0.875, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= 0.8219051361083984) {
                            if (input[6] <= -1.2135227918624878) {
                                if (input[5] <= -0.658241018652916) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.8888888888888888, 0.1111111111111111, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 2.0453299283981323) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.20242914979757085, 0.7975708502024291, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.4883347302675247) {
                                memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[7] <= -0.05440984666347504) {
                    if (input[3] <= -0.31789515912532806) {
                        if (input[1] <= -0.9246085286140442) {
                            if (input[6] <= 0.5912947058677673) {
                                if (input[1] <= -1.4718817472457886) {
                                    memcpy(var24, (double[]){0.926829268292683, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07317073170731707, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.38095238095238093, 0.0, 0.027210884353741496, 0.0, 0.0, 0.0, 0.4557823129251701, 0.1360544217687075}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= 0.09995114803314209) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -0.19271069020032883) {
                                if (input[5] <= 0.7071486711502075) {
                                    memcpy(var24, (double[]){0.035211267605633804, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2007042253521127, 0.7640845070422535}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8571428571428571, 0.14285714285714285}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.19211751222610474) {
                                    memcpy(var24, (double[]){0.03460837887067395, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6384335154826958, 0.32695810564663025}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.46959459459459457, 0.5304054054054054}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.0907605290412903) {
                            if (input[1] <= -1.0036254525184631) {
                                if (input[9] <= 0.11385738104581833) {
                                    memcpy(var24, (double[]){0.007407407407407408, 0.0, 0.37777777777777777, 0.5407407407407407, 0.07407407407407407, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.1476021260023117) {
                                    memcpy(var24, (double[]){0.011778563015312132, 0.0, 0.0176678445229682, 0.9552414605418139, 0.015312131919905771, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.25925925925925924, 0.0, 0.1111111111111111, 0.5925925925925926, 0.037037037037037035, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[10] <= 1.6644272953271866) {
                                if (input[7] <= -0.31509830057621) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.03062200956937799, 0.18564593301435406, 0.783732057416268, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.34511434511434513, 0.6548856548856549, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -1.0844290852546692) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.07692307692307693, 0.9230769230769231, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.12121212121212122, 0.3484848484848485, 0.5303030303030303, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[6] <= 1.4834017157554626) {
                        if (input[8] <= -0.5316957831382751) {
                            if (input[1] <= -0.0504982303828001) {
                                if (input[3] <= -0.40606389939785004) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1702127659574468, 0.8297872340425532}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.6214953271028038, 0.37850467289719625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.6152353882789612) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.10576923076923077, 0.08653846153846154, 0.0, 0.25, 0.5576923076923077}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.28618421052631576, 0.06578947368421052, 0.0, 0.29605263157894735, 0.3519736842105263}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.22871223464608192) {
                                if (input[8] <= -0.2601795494556427) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.09317803660565724, 0.9068219633943427}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.875, 0.125}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.666936218738556) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.4375, 0.5625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -0.326741561293602) {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        } else {
                            if (input[5] <= -0.33992233872413635) {
                                if (input[3] <= -0.16052456200122833) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.11758599616587162) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[4] <= -1.0078328847885132) {
                if (input[2] <= -1.1130396127700806) {
                    if (input[8] <= 1.4697664380073547) {
                        if (input[6] <= 1.8377496600151062) {
                            if (input[1] <= 0.981169193983078) {
                                if (input[2] <= -1.9583664536476135) {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -1.1001347601413727) {
                                    memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= 1.6246302127838135) {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= -1.8546664714813232) {
                                    memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= 1.0634155571460724) {
                            if (input[4] <= -1.3254141807556152) {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= 1.5016131401062012) {
                                if (input[7] <= 1.4943965673446655) {
                                    memcpy(var24, (double[]){0.0, 0.9743589743589743, 0.0, 0.0, 0.0, 0.0, 0.02564102564102564, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= 0.5840233862400055) {
                        if (input[9] <= -0.44110338389873505) {
                            if (input[5] <= 0.00860962038859725) {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= -0.5724701136350632) {
                                    memcpy(var24, (double[]){0.0, 0.058823529411764705, 0.0, 0.0, 0.0, 0.9411764705882353, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.6491451263427734) {
                                if (input[0] <= -1.1390436887741089) {
                                    memcpy(var24, (double[]){0.0, 0.0625, 0.0, 0.0, 0.0, 0.6875, 0.25, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.015384615384615385, 0.0, 0.0, 0.0, 0.038461538461538464, 0.9461538461538461, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 2.0359848737716675) {
                                    memcpy(var24, (double[]){0.0, 0.625, 0.0, 0.0, 0.0, 0.0, 0.375, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[0] <= 0.13311965577304363) {
                            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[4] <= -0.7955048382282257) {
                    if (input[5] <= 0.2777857184410095) {
                        if (input[3] <= -0.9132107496261597) {
                            memcpy(var24, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[5] <= 0.5905952155590057) {
                            if (input[7] <= 1.5794277787208557) {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[0] <= 0.04563832562416792) {
                        if (input[5] <= -0.05416876822710037) {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[5] <= -0.23206108808517456) {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var24, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        }
    }
    add_vectors(var7, var24, 8, var6);
    double var25[8];
    if (input[7] <= 0.9149860739707947) {
        if (input[9] <= 0.9654439687728882) {
            if (input[0] <= 1.4217281341552734) {
                if (input[1] <= -0.5938424468040466) {
                    if (input[3] <= -0.4191710352897644) {
                        if (input[5] <= -0.8439439535140991) {
                            if (input[0] <= 0.03487155307084322) {
                                memcpy(var25, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[3] <= -0.5208138823509216) {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= 0.01971757411956787) {
                                    memcpy(var25, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= -0.6946412920951843) {
                            if (input[7] <= -0.8825309574604034) {
                                if (input[8] <= -0.575244814157486) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.9736421725239617, 0.004792332268370607, 0.02156549520766773, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.125, 0.375, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.637370228767395) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.8407407407407408, 0.08888888888888889, 0.07037037037037037, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.20512820512820512, 0.0, 0.7948717948717948, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.1096475720405579) {
                                if (input[1] <= -1.483925700187683) {
                                    memcpy(var25, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.1037037037037037, 0.8629629629629629, 0.02962962962962963, 0.0, 0.003703703703703704, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -1.382052719593048) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.6, 0.2, 0.2, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.05321507760532151, 0.15077605321507762, 0.7960088691796009, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[1] <= 0.060125237330794334) {
                        if (input[9] <= -0.670621931552887) {
                            if (input[0] <= -0.3952847272157669) {
                                if (input[1] <= 0.031607139855623245) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.2177121771217712, 0.16605166051660517, 0.0, 0.6162361623616236, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.875, 0.125, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.093485176563263) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.5714285714285714, 0.0, 0.0, 0.42857142857142855, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.164021164021164, 0.8359788359788359, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 1.1429988145828247) {
                                if (input[5] <= 0.6854339838027954) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.3888396811337467, 0.5048715677590788, 0.0, 0.10628875110717449, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.08333333333333333, 0.20833333333333334, 0.0, 0.7083333333333334, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.3403255045413971) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.16216216216216217, 0.0, 0.8378378378378378, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.14285714285714285, 0.8571428571428571, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.528558999300003) {
                            if (input[4] <= -0.391723096370697) {
                                if (input[5] <= -0.5406496822834015) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.8, 0.12, 0.0, 0.08, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.5285714285714286, 0.35714285714285715, 0.0, 0.11428571428571428, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.29590102285146713) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.6157894736842106, 0.38421052631578945, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= -0.7377641797065735) {
                                if (input[4] <= -1.1502174139022827) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.8125, 0.1875, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.27068743854761124) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0547945205479452, 0.9452054794520548, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.8064516129032258, 0.1935483870967742, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[8] <= -0.5879567861557007) {
                    if (input[0] <= 1.5620840787887573) {
                        if (input[7] <= -0.7806143760681152) {
                            if (input[9] <= -0.7071592509746552) {
                                if (input[3] <= -0.12906422838568687) {
                                    memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.70799520611763) {
                                    memcpy(var25, (double[]){0.6666666666666666, 0.0, 0.05555555555555555, 0.0, 0.0, 0.0, 0.2777777777777778, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.9294117647058824, 0.0, 0.03529411764705882, 0.0, 0.011764705882352941, 0.0, 0.023529411764705882, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= -0.8130905330181122) {
                                if (input[3] <= 0.8842924386262894) {
                                    memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 0.148636594414711) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.25, 0.0, 0.0, 0.0, 0.125, 0.0, 0.625, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.5964705646038055) {
                            if (input[3] <= 0.10094165056943893) {
                                if (input[2] <= 0.020140284672379494) {
                                    memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.9845094664371773, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01549053356282272, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.8096969425678253) {
                                    memcpy(var25, (double[]){0.18181818181818182, 0.0, 0.7272727272727273, 0.0, 0.09090909090909091, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= -0.8384421765804291) {
                                if (input[4] <= 0.019402739126235247) {
                                    memcpy(var25, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 0.9224445223808289) {
                                    memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= 1.3522820472717285) {
                        if (input[3] <= 0.14252255856990814) {
                            memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var25, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[1] <= -1.2591004371643066) {
                memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            } else {
                if (input[7] <= -0.9295806586742401) {
                    memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[9] <= 1.0947840809822083) {
                        if (input[5] <= -0.8696431517601013) {
                            if (input[7] <= -0.6004890501499176) {
                                if (input[8] <= -0.5882828533649445) {
                                    memcpy(var25, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                }
            }
        }
    } else {
        if (input[5] <= 0.9204782843589783) {
            if (input[9] <= 0.16088725626468658) {
                if (input[5] <= 0.03019119519740343) {
                    if (input[2] <= -1.0731562376022339) {
                        if (input[1] <= 1.2306405305862427) {
                            if (input[8] <= 1.0670679211616516) {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= 1.1363723874092102) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.9649122807017544, 0.0, 0.0, 0.0, 0.0, 0.03508771929824561, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= -1.2635561227798462) {
                                memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= -0.6065249443054199) {
                                    memcpy(var25, (double[]){0.0, 0.3333333333333333, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -1.8580974340438843) {
                            memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[8] <= 1.9892373085021973) {
                                if (input[8] <= 1.5555037260055542) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.22727272727272727, 0.0, 0.0, 0.0, 0.0, 0.7727272727272727, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -0.36659157276153564) {
                                    memcpy(var25, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= 1.7049702405929565) {
                        if (input[8] <= 2.1982080936431885) {
                            if (input[5] <= 0.06528453901410103) {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[5] <= 0.36967504024505615) {
                                    memcpy(var25, (double[]){0.0, 0.16901408450704225, 0.0, 0.0, 0.0, 0.5492957746478874, 0.28169014084507044, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.08461538461538462, 0.0, 0.0, 0.0, 0.8692307692307693, 0.046153846153846156, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= 1.1944245100021362) {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[5] <= 0.7542718350887299) {
                                    memcpy(var25, (double[]){0.0, 0.9523809523809523, 0.0, 0.0, 0.0, 0.047619047619047616, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -0.7922061681747437) {
                            if (input[3] <= -0.8517466485500336) {
                                if (input[4] <= -1.3206408619880676) {
                                    memcpy(var25, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.1915614008903503) {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.6, 0.0, 0.0, 0.0, 0.0, 0.4, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[0] <= -2.0776463747024536) {
                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[4] <= -1.1299281120300293) {
                        if (input[7] <= 1.3163692951202393) {
                            if (input[2] <= -0.7118090689182281) {
                                if (input[2] <= -1.1574450135231018) {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.9166666666666666, 0.0, 0.0, 0.0, 0.0, 0.08333333333333333, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.6261922121047974) {
                                    memcpy(var25, (double[]){0.0, 0.9230769230769231, 0.0, 0.0, 0.0, 0.0, 0.07692307692307693, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0625, 0.0, 0.0, 0.0, 0.0, 0.9375, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= 0.21032361686229706) {
                                if (input[4] <= -1.8263261318206787) {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.9540816326530612, 0.0, 0.0, 0.0, 0.0, 0.04591836734693878, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.09786935150623322) {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= 0.9899284243583679) {
                            memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[8] <= 1.912030041217804) {
                                if (input[3] <= -0.8126781582832336) {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.5714285714285714, 0.42857142857142855, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        } else {
            if (input[9] <= 0.4680674374103546) {
                if (input[8] <= 2.5303210020065308) {
                    if (input[5] <= 1.3023422360420227) {
                        if (input[4] <= -1.5506106615066528) {
                            memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[1] <= 1.369089961051941) {
                            if (input[4] <= -1.6136167645454407) {
                                memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[2] <= -1.8765047788619995) {
                                if (input[4] <= -1.115896537899971) {
                                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.8403516411781311) {
                                    memcpy(var25, (double[]){0.0, 0.037037037037037035, 0.0, 0.0, 0.0, 0.9629629629629629, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var25, (double[]){0.0, 0.003952569169960474, 0.0, 0.0, 0.0, 0.9960474308300395, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            } else {
                if (input[5] <= 1.800568699836731) {
                    memcpy(var25, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    memcpy(var25, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        }
    }
    add_vectors(var6, var25, 8, var5);
    double var26[8];
    if (input[3] <= -0.20592230558395386) {
        if (input[0] <= 1.4213103652000427) {
            if (input[8] <= 0.08627868443727493) {
                if (input[9] <= 0.8735681474208832) {
                    if (input[3] <= -0.3683586120605469) {
                        if (input[7] <= -1.081925630569458) {
                            memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[7] <= -0.8129425048828125) {
                            memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[2] <= -0.5608698725700378) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                }
            } else {
                if (input[4] <= -1.1426379084587097) {
                    if (input[8] <= 1.4702744483947754) {
                        if (input[5] <= 1.1896178722381592) {
                            if (input[4] <= -1.840499758720398) {
                                memcpy(var26, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[3] <= -0.9147543013095856) {
                                    memcpy(var26, (double[]){0.0, 0.7142857142857143, 0.0, 0.0, 0.0, 0.0, 0.2857142857142857, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.22289156626506024, 0.0, 0.0, 0.0, 0.030120481927710843, 0.7469879518072289, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= -0.00703827477991581) {
                                if (input[4] <= -1.761561393737793) {
                                    memcpy(var26, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 1.5415502786636353) {
                                    memcpy(var26, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.5, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[5] <= 2.323194682598114) {
                            if (input[9] <= 0.10520556941628456) {
                                if (input[4] <= -1.6756216287612915) {
                                    memcpy(var26, (double[]){0.0, 0.9850746268656716, 0.0, 0.0, 0.0, 0.0, 0.014925373134328358, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.4307692307692308, 0.0, 0.0, 0.0, 0.046153846153846156, 0.5230769230769231, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.6007278859615326) {
                                    memcpy(var26, (double[]){0.0, 0.9731343283582089, 0.0, 0.0, 0.0, 0.0, 0.026865671641791045, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[0] <= -0.8659372627735138) {
                        if (input[0] <= -1.1157520413398743) {
                            if (input[5] <= -0.042968474328517914) {
                                if (input[6] <= -0.5036299824714661) {
                                    memcpy(var26, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -0.9335359930992126) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9629629629629629, 0.037037037037037035, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[0] <= -1.1058038473129272) {
                                if (input[0] <= -1.107154905796051) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.8571428571428571, 0.14285714285714285, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.06218739598989487) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.003067484662576687, 0.0, 0.0, 0.0, 0.9969325153374233, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -0.792038768529892) {
                            if (input[1] <= 0.9439364373683929) {
                                if (input[6] <= 0.5028221160173416) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.4, 0.6, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -0.013498209824319929) {
                                    memcpy(var26, (double[]){0.0, 0.014705882352941178, 0.0, 0.0, 0.0, 0.16176470588235298, 0.823529411764706, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.8333333333333334, 0.16666666666666666, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= 0.19400323927402496) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[9] <= 0.5918354392051697) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9957983193277311, 0.004201680672268907, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[8] <= -0.5367443114519119) {
                if (input[6] <= -0.5724309682846069) {
                    if (input[1] <= -1.0007654130458832) {
                        memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[10] <= 1.6644272953271866) {
                            if (input[7] <= -0.5976539552211761) {
                                if (input[5] <= -0.6228310763835907) {
                                    memcpy(var26, (double[]){0.9767441860465116, 0.0, 0.0, 0.0, 0.0, 0.0, 0.023255813953488372, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.5113144069910049) {
                                    memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.5729163587093353) {
                                memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[1] <= -0.9180362224578857) {
                        if (input[3] <= -0.7242954969406128) {
                            if (input[3] <= -0.7253052294254303) {
                                if (input[2] <= 0.3146106153726578) {
                                    memcpy(var26, (double[]){0.990909090909091, 0.0, 0.0, 0.0, 0.0, 0.0, 0.00909090909090909, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.8857142857142857, 0.0, 0.0, 0.0, 0.0, 0.0, 0.11428571428571428, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= -0.5182806998491287) {
                                if (input[10] <= 1.6644272953271866) {
                                    memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.9583333333333334, 0.0, 0.0, 0.0, 0.0, 0.0, 0.041666666666666664, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.607626348733902) {
                                    memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -0.9161284267902374) {
                            memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[6] <= -0.571249783039093) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= -0.4370252937078476) {
                                    memcpy(var26, (double[]){0.5833333333333334, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4166666666666667, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.9387755102040817, 0.0, 0.0, 0.0, 0.0, 0.0, 0.061224489795918366, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
            }
        }
    } else {
        if (input[7] <= -0.821524977684021) {
            if (input[0] <= 1.4727401733398438) {
                if (input[1] <= -0.5915703773498535) {
                    if (input[7] <= -0.8827335238456726) {
                        if (input[7] <= -1.0654832124710083) {
                            memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[7] <= -1.064761221408844) {
                                if (input[0] <= 0.2161918804049492) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.5862459540367126) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.9662027833001988, 0.02385685884691849, 0.009940357852882704, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.7228915662650602, 0.024096385542168676, 0.25301204819277107, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.7849419116973877) {
                            if (input[6] <= -1.7417272925376892) {
                                if (input[3] <= 0.7592966705560684) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.2619543075561523) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.888888888888889, 0.08641975308641976, 0.02469135802469136, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.65, 0.025, 0.325, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= -0.0909521784633398) {
                                memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[5] <= -1.087262123823166) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[8] <= -0.600116103887558) {
                        if (input[7] <= -1.011966347694397) {
                            if (input[3] <= 0.8383590430021286) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[1] <= 0.8862788677215576) {
                                if (input[3] <= 0.9042734205722809) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0625, 0.9375, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[3] <= 1.1887008547782898) {
                            if (input[6] <= -0.9388269484043121) {
                                if (input[4] <= 0.6647909879684448) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.4, 0.6, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= 1.311185896396637) {
                                if (input[2] <= 0.14040996134281158) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.1509433962264151, 0.8490566037735849, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[1] <= -0.10408132895827293) {
                    if (input[9] <= -0.4661165177822113) {
                        if (input[1] <= -1.010202556848526) {
                            if (input[0] <= 1.8023226261138916) {
                                memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= -0.8753454387187958) {
                                    memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.9553292691707611) {
                                memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= -0.5941436588764191) {
                            memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                }
            }
        } else {
            if (input[1] <= -0.06624512374401093) {
                if (input[3] <= 1.1992955803871155) {
                    if (input[0] <= 1.1684816479682922) {
                        if (input[1] <= -1.4608352184295654) {
                            memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[8] <= -0.5976238250732422) {
                                if (input[1] <= -0.5800432562828064) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.2832369942196532, 0.6127167630057804, 0.10404624277456648, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.9402985074626866, 0.05970149253731343, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.774683803319931) {
                                    memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.00821917808219178, 0.947945205479452, 0.043835616438356165, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 0.5469733625650406) {
                            if (input[0] <= 1.4269632697105408) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= -0.6679272055625916) {
                                memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[2] <= -0.6628167033195496) {
                        if (input[1] <= -0.8460524678230286) {
                            if (input[8] <= -0.5796999335289001) {
                                memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[0] <= -0.47107361257076263) {
                                if (input[4] <= 1.0110384225845337) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.7870883941650391) {
                                    memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.047619047619047616, 0.9523809523809523, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -1.475988507270813) {
                            memcpy(var26, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[2] <= 0.5431901812553406) {
                                if (input[0] <= -1.465154230594635) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.02616279069767442, 0.11046511627906977, 0.8633720930232558, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.39597421884536743) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.027692307692307693, 0.31384615384615383, 0.6584615384615384, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.004484304932735426, 0.14349775784753363, 0.852017937219731, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[0] <= 0.348706379532814) {
                    if (input[3] <= 1.3140455484390259) {
                        if (input[9] <= 0.4594195485115051) {
                            if (input[3] <= 1.158567488193512) {
                                if (input[1] <= 0.02540490310639143) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.9692307692307692, 0.03076923076923077, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.9970674486803519, 0.002932551319648094, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= -0.31627897918224335) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.6428571428571429, 0.35714285714285715, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= 0.8164479732513428) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[10] <= 1.6644272953271866) {
                            if (input[1] <= 0.9202313423156738) {
                                if (input[3] <= 1.9238722920417786) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.5158371040723982, 0.4841628959276018, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.01, 0.99, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[3] <= 1.8701531291007996) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[1] <= 0.15909060928970575) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= -0.395658478140831) {
                        if (input[4] <= 0.9821762442588806) {
                            if (input[5] <= 0.4023437350988388) {
                                if (input[8] <= -0.5507646203041077) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.15555555555555556, 0.8444444444444444, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.7142857142857143, 0.2857142857142857, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.5405630767345428) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.4, 0.6, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.2480993866920471) {
                                if (input[0] <= 1.5108775198459625) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.6949929893016815) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.4106200337409973) {
                            if (input[1] <= 0.6252956688404083) {
                                memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= 1.0989473462104797) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= 0.16556032001972198) {
                                if (input[2] <= 1.7151503562927246) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.029411764705882353, 0.9705882352941176, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 1.1969603896141052) {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 0.36585365853658536, 0.6341463414634146, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var26, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var5, var26, 8, var4);
    double var27[8];
    if (input[0] <= 1.4213103652000427) {
        if (input[3] <= -0.3067648708820343) {
            if (input[7] <= 0.7174621224403381) {
                if (input[8] <= -0.5148618817329407) {
                    if (input[4] <= -0.19023307412862778) {
                        if (input[9] <= 0.8735681474208832) {
                            if (input[2] <= -0.6065729558467865) {
                                memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[8] <= -0.5511367619037628) {
                            if (input[7] <= -0.019139605574309826) {
                                if (input[0] <= 0.7034208178520203) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.004484304932735426, 0.0, 0.0, 0.0, 0.7997010463378177, 0.19581464872944693}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9945054945054945, 0.005494505494505495}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.6048186421394348) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.27419354838709675, 0.7258064516129032}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5360824742268041, 0.4639175257731959}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[6] <= 0.4231211543083191) {
                                if (input[8] <= -0.5487902164459229) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.34375, 0.65625}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6655290102389079, 0.33447098976109213}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.4975065141916275) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4318181818181818, 0.5681818181818182}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[5] <= 0.5907129347324371) {
                        if (input[6] <= 1.972611427307129) {
                            if (input[8] <= -0.18111791461706161) {
                                if (input[8] <= -0.4839647710323334) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2862190812720848, 0.7137809187279152}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06513872135102533, 0.9348612786489746}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[6] <= 2.4999669790267944) {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[7] <= -0.015497134998440742) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[7] <= -0.38845090568065643) {
                            if (input[9] <= 0.2744072675704956) {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.4652804583311081) {
                                if (input[3] <= -1.0259268581867218) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.012658227848101266, 0.9873417721518988, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[1] <= 1.0077291131019592) {
                    if (input[8] <= 1.7390570044517517) {
                        if (input[7] <= 0.9212357103824615) {
                            if (input[6] <= 0.6794345378875732) {
                                if (input[8] <= -0.3049739599227905) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.10714285714285714, 0.8928571428571429}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.375, 0.625, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= 0.04348769783973694) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.6666666666666666}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9230769230769231, 0.0, 0.07692307692307693}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.4433509558439255) {
                                if (input[0] <= -0.9603746831417084) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9917695473251029, 0.00823045267489712, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.04979253112033195, 0.0, 0.0, 0.0, 0.8340248962655602, 0.11618257261410789, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.5694208443164825) {
                                    memcpy(var27, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.7142857142857143, 0.0, 0.0, 0.0, 0.2857142857142857, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[9] <= 0.13300175964832306) {
                            if (input[5] <= 0.020514984615147114) {
                                if (input[7] <= 1.147631049156189) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.9375, 0.0, 0.0, 0.0, 0.0, 0.0625, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 1.7476516366004944) {
                                    memcpy(var27, (double[]){0.0, 0.0136986301369863, 0.0, 0.0, 0.0, 0.9863013698630136, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.16666666666666666, 0.0, 0.0, 0.0, 0.8333333333333334, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 1.256909728050232) {
                                memcpy(var27, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[2] <= -1.3796764016151428) {
                        if (input[8] <= 1.3765981793403625) {
                            if (input[4] <= -1.1097043752670288) {
                                if (input[0] <= 0.1720223668962717) {
                                    memcpy(var27, (double[]){0.0, 0.9411764705882353, 0.0, 0.0, 0.0, 0.022058823529411766, 0.03676470588235294, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= 1.196669578552246) {
                                if (input[5] <= 0.8067756593227386) {
                                    memcpy(var27, (double[]){0.0, 0.9090909090909091, 0.0, 0.0, 0.0, 0.0, 0.09090909090909091, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 1.3121556043624878) {
                                    memcpy(var27, (double[]){0.0, 0.8723404255319149, 0.0, 0.0, 0.0, 0.1276595744680851, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.9620253164556962, 0.0, 0.0, 0.0, 0.0379746835443038, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -1.00973242521286) {
                            if (input[8] <= 1.678814709186554) {
                                if (input[7] <= 1.5567699670791626) {
                                    memcpy(var27, (double[]){0.0, 0.22340425531914893, 0.0, 0.0, 0.0, 0.05319148936170213, 0.723404255319149, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.8506493506493507, 0.0, 0.0, 0.0, 0.012987012987012988, 0.13636363636363635, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.03833921626210213) {
                                    memcpy(var27, (double[]){0.0, 0.7283950617283951, 0.0, 0.0, 0.0, 0.024691358024691357, 0.24691358024691357, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.9929078014184397, 0.0, 0.0, 0.0, 0.002364066193853428, 0.004728132387706856, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 0.007606790401041508) {
                                if (input[4] <= -0.3477173447608948) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.1553925722837448) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9888392857142857, 0.011160714285714286, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[0] <= 0.36072003841400146) {
                if (input[2] <= -0.14611061662435532) {
                    if (input[3] <= 1.5793856382369995) {
                        if (input[7] <= -0.5864928364753723) {
                            if (input[8] <= -0.5713227987289429) {
                                if (input[2] <= -0.20257286727428436) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.9774647887323944, 0.005633802816901409, 0.016901408450704224, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.9130434782608695, 0.0, 0.08695652173913043, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.9703425168991089) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.7777777777777778, 0.2222222222222222, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.2306716442108154) {
                                if (input[5] <= 0.060860889963805676) {
                                    memcpy(var27, (double[]){0.0, 0.09090909090909091, 0.0, 0.7954545454545454, 0.11363636363636363, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.35714285714285715, 0.5714285714285714, 0.0, 0.0, 0.0, 0.07142857142857142}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= 0.27972687408328056) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.7538304924964905) {
                            if (input[1] <= -0.5787602066993713) {
                                if (input[6] <= -0.47542598843574524) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.9523809523809523, 0.0, 0.047619047619047616, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.5555555555555556, 0.05555555555555555, 0.3888888888888889, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.6930661797523499) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.5559387803077698) {
                                if (input[7] <= -0.852963387966156) {
                                    memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.04, 0.0, 0.96, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.553774505853653) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.034482758620689655, 0.9655172413793104, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.3, 0.7, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= 1.3156734108924866) {
                        if (input[2] <= 0.2024615928530693) {
                            if (input[7] <= -0.7063727974891663) {
                                if (input[8] <= -0.5807763338088989) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.9540229885057471, 0.028735632183908046, 0.017241379310344827, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.9, 0.1, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 2.0467857718467712) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.03773584905660377, 0.8773584905660378, 0.08490566037735849, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.5934244096279144) {
                                if (input[9] <= -0.51285719871521) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.7593582887700535, 0.21390374331550802, 0.026737967914438502, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.4703389830508475, 0.4194915254237288, 0.11016949152542373, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.3864009529352188) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.9541139240506329, 0.04588607594936709, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[6] <= 0.9002400040626526) {
                            if (input[3] <= 1.9412157535552979) {
                                if (input[3] <= 1.6677364706993103) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.32196162046908317, 0.1812366737739872, 0.4968017057569296, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.06918238993710692, 0.3689727463312369, 0.5618448637316562, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= 1.8057199716567993) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0273972602739726, 0.010273972602739725, 0.9623287671232876, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.75, 0.0, 0.25, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.6609519124031067) {
                                if (input[8] <= -0.5906240940093994) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.9333333333333333, 0.06666666666666667, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.125, 0.625, 0.25, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.009935571812093258) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.34615384615384615, 0.34615384615384615, 0.3076923076923077, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[3] <= 1.361602246761322) {
                    if (input[7] <= -0.7169585525989532) {
                        if (input[1] <= -0.5324965119361877) {
                            if (input[9] <= 0.16401555389165878) {
                                if (input[6] <= 1.8954172730445862) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.9646017699115044, 0.004424778761061947, 0.030973451327433628, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.75, 0.25, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        if (input[3] <= 0.8590425252914429) {
                            if (input[7] <= -0.5934476256370544) {
                                if (input[4] <= -0.5899908989667892) {
                                    memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[2] <= 0.0917915515601635) {
                                if (input[0] <= 0.43472836911678314) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.06666666666666667, 0.0, 0.9333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5693941712379456) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.03333333333333333, 0.4, 0.5666666666666667, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.9090909090909091, 0.09090909090909091, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[6] <= 1.1489588618278503) {
                        if (input[6] <= -1.2267623543739319) {
                            if (input[1] <= -0.8300901353359222) {
                                memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[6] <= -1.3599053025245667) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.4666666666666667, 0.5333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.8, 0.0, 0.2, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= -0.6607578694820404) {
                                if (input[3] <= 1.4715937972068787) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.6666666666666667, 0.11111111111111112, 0.22222222222222224, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.14375, 0.14375, 0.7125, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -1.0721191763877869) {
                                    memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0215311004784689, 0.07894736842105263, 0.8995215311004785, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -0.31793156266212463) {
                            memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        }
    } else {
        if (input[1] <= 0.2760525196790695) {
            if (input[9] <= -0.6093721091747284) {
                if (input[3] <= 0.04405111074447632) {
                    if (input[10] <= 1.6644272953271866) {
                        if (input[2] <= -1.2480976581573486) {
                            if (input[1] <= -0.9347427785396576) {
                                memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[1] <= -0.49577099084854126) {
                                if (input[5] <= -1.2636604309082031) {
                                    memcpy(var27, (double[]){0.75, 0.0, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.4555014967918396) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.9333333333333333, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06666666666666667, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[0] <= 1.7343899607658386) {
                            memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[7] <= -0.733077347278595) {
                        if (input[4] <= 1.2385118007659912) {
                            if (input[7] <= -0.8415089249610901) {
                                memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[3] <= 0.7282831519842148) {
                                    memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[8] <= -0.5862445533275604) {
                                memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= -0.5548614859580994) {
                            memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[3] <= 0.7103767618536949) {
                    if (input[0] <= 1.563535213470459) {
                        if (input[2] <= -0.2771499752998352) {
                            if (input[7] <= -0.5451638400554657) {
                                if (input[3] <= -0.628815084695816) {
                                    memcpy(var27, (double[]){0.8636363636363636, 0.0, 0.0, 0.0, 0.0, 0.0, 0.13636363636363635, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.16460329294204712) {
                                if (input[0] <= 1.4257997274398804) {
                                    memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.5254237288135594, 0.0, 0.01694915254237288, 0.0, 0.0, 0.0, 0.4576271186440678, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[7] <= -0.4490512013435364) {
                            if (input[3] <= 0.06926916353404522) {
                                if (input[7] <= -0.5853269994258881) {
                                    memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.8571428571428571, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14285714285714285, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.43043817579746246) {
                                    memcpy(var27, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.6551254093647003) {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[10] <= 1.6644272953271866) {
                        if (input[4] <= -1.1461286544799805) {
                            memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[1] <= -1.1151903867721558) {
                                if (input[3] <= 1.9111140966415405) {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        memcpy(var27, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[6] <= -1.1339469850063324) {
                memcpy(var27, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            } else {
                memcpy(var27, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            }
        }
    }
    add_vectors(var4, var27, 8, var3);
    double var28[8];
    if (input[8] <= 0.08627868443727493) {
        if (input[9] <= 0.9682269990444183) {
            if (input[0] <= 1.4217281341552734) {
                if (input[2] <= -0.13562428951263428) {
                    if (input[3] <= 1.5834689140319824) {
                        if (input[0] <= 0.6796739995479584) {
                            if (input[7] <= -0.7181553542613983) {
                                if (input[8] <= -0.567298024892807) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.9880478087649402, 0.00398406374501992, 0.00796812749003984, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.5384615384615384, 0.38461538461538464, 0.0, 0.07692307692307693, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= 0.11917784437537193) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.09722222222222222, 0.4305555555555556, 0.1875, 0.0, 0.2847222222222222, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.1111111111111111, 0.0, 0.0, 0.8888888888888888, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= -0.5982843339443207) {
                                if (input[7] <= -0.8117529153823853) {
                                    memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.14285714285714285, 0.2857142857142857, 0.3333333333333333, 0.0, 0.23809523809523808, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[1] <= -0.5119082927703857) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.23255813953488372, 0.023255813953488372, 0.0, 0.0, 0.7441860465116279, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.09523809523809523, 0.7142857142857143, 0.0, 0.19047619047619047, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.6007232069969177) {
                            if (input[7] <= -0.8049803376197815) {
                                if (input[9] <= -0.5051383525133133) {
                                    memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.6875, 0.0, 0.3125, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -1.6361784040927887) {
                                    memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.02857142857142857, 0.04285714285714286, 0.9285714285714286, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= 0.3275535851716995) {
                                if (input[2] <= -0.6937600672245026) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.27586206896551724, 0.7241379310344828, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.017241379310344827, 0.05172413793103448, 0.9310344827586207, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.6243473291397095) {
                                    memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.4117647058823529, 0.5882352941176471, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[3] <= -0.3626430034637451) {
                        if (input[4] <= -0.17147588729858398) {
                            if (input[10] <= 1.6644272953271866) {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[6] <= -0.5887390226125717) {
                                    memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -1.081925630569458) {
                                memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[6] <= 0.556795209646225) {
                            if (input[7] <= -0.8888755440711975) {
                                if (input[8] <= -0.580182820558548) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.8845070422535212, 0.02676056338028169, 0.08873239436619719, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.022727272727272728, 0.6818181818181818, 0.29545454545454547, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= 1.0491523146629333) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.08267270668176671, 0.9003397508493771, 0.01698754246885617, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.04931862426995458, 0.23166774821544453, 0.719013627514601, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.9082119464874268) {
                                if (input[5] <= -0.3261719346046448) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.3562231759656652, 0.5708154506437768, 0.07296137339055794, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.5416666666666666, 0.3993055555555556, 0.059027777777777776, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 1.1948969960212708) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.02702702702702703, 0.05405405405405406, 0.918918918918919, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.2, 0.6, 0.2, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[5] <= 1.0438047647476196) {
                    if (input[0] <= 1.618678867816925) {
                        if (input[7] <= -0.7853836417198181) {
                            if (input[3] <= -0.06883366219699383) {
                                if (input[3] <= -0.8311156630516052) {
                                    memcpy(var28, (double[]){0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.9523809523809523, 0.0, 0.0, 0.0, 0.0, 0.0, 0.047619047619047616, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[3] <= 1.208499789237976) {
                                if (input[8] <= -0.6144602000713348) {
                                    memcpy(var28, (double[]){0.4634146341463415, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5365853658536586, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.08695652173913043, 0.0, 0.0, 0.043478260869565216, 0.0, 0.0, 0.8695652173913043, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= -0.5879567861557007) {
                            if (input[2] <= 1.1826238632202148) {
                                if (input[3] <= 0.06926916353404522) {
                                    memcpy(var28, (double[]){0.9979281767955801, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0020718232044198894, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0625, 0.0, 0.4375, 0.0, 0.5, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 1.1926907300949097) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.8461538461538461, 0.0, 0.15384615384615385, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= -0.3528408408164978) {
                                memcpy(var28, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[1] <= -1.5725201964378357) {
                        memcpy(var28, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[7] <= -0.754243016242981) {
                            memcpy(var28, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            }
        } else {
            if (input[0] <= 1.8213334679603577) {
                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
            } else {
                memcpy(var28, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
            }
        }
    } else {
        if (input[4] <= -1.1426379084587097) {
            if (input[7] <= 1.1768608093261719) {
                if (input[5] <= 0.5898612439632416) {
                    if (input[4] <= -1.9373862147331238) {
                        memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[1] <= 1.6152583956718445) {
                            if (input[5] <= 0.35541586577892303) {
                                if (input[3] <= -0.8241256475448608) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.058823529411764705, 0.9411764705882353, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= 0.0322188138961792) {
                                    memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[3] <= -0.5559107065200806) {
                        memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[7] <= 1.5142350792884827) {
                    if (input[8] <= 1.4730244874954224) {
                        if (input[9] <= 0.4268910139799118) {
                            if (input[2] <= -1.4432221055030823) {
                                if (input[5] <= 0.5575158596038818) {
                                    memcpy(var28, (double[]){0.0, 0.9523809523809523, 0.0, 0.0, 0.0, 0.0, 0.047619047619047616, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= -0.9965476393699646) {
                                    memcpy(var28, (double[]){0.0, 0.3333333333333333, 0.0, 0.0, 0.0, 0.6666666666666666, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.09210526315789473, 0.0, 0.0, 0.0, 0.013157894736842105, 0.8947368421052632, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -1.735037624835968) {
                                memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= -0.339830469340086) {
                                    memcpy(var28, (double[]){0.0, 0.9285714285714286, 0.0, 0.0, 0.0, 0.0, 0.07142857142857142, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[4] <= -1.7980087399482727) {
                            memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[2] <= -1.1298664212226868) {
                                if (input[2] <= -1.3847625851631165) {
                                    memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.8, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.12786607816815376) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.95, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.9230769230769231, 0.0, 0.0, 0.0, 0.0, 0.07692307692307693, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[8] <= 0.3972841054201126) {
                        memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[9] <= -0.23044205456972122) {
                            if (input[8] <= 1.0403354167938232) {
                                if (input[5] <= 0.7393270283937454) {
                                    memcpy(var28, (double[]){0.0, 0.1111111111111111, 0.0, 0.0, 0.0, 0.0, 0.8888888888888888, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= 1.7189574837684631) {
                                    memcpy(var28, (double[]){0.0, 0.7368421052631579, 0.0, 0.0, 0.0, 0.15789473684210525, 0.10526315789473684, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.9824561403508771, 0.0, 0.0, 0.0, 0.0, 0.017543859649122806, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= 1.5421634912490845) {
                                if (input[7] <= 1.5411369800567627) {
                                    memcpy(var28, (double[]){0.0, 0.9857142857142858, 0.0, 0.0, 0.0, 0.014285714285714285, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.4294289946556091) {
                                    memcpy(var28, (double[]){0.0, 0.9988751406074241, 0.0, 0.0, 0.0, 0.0, 0.0011248593925759281, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.92, 0.0, 0.0, 0.0, 0.02, 0.06, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[4] <= -0.8152535557746887) {
                if (input[2] <= -1.350111961364746) {
                    if (input[5] <= 0.9250221699476242) {
                        if (input[8] <= 1.5988287925720215) {
                            if (input[4] <= -0.9965726733207703) {
                                memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            memcpy(var28, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    } else {
                        memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[0] <= -0.9130545556545258) {
                        if (input[1] <= 1.2301852107048035) {
                            if (input[0] <= -1.188075304031372) {
                                if (input[4] <= -0.8998264074325562) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.8888888888888888, 0.1111111111111111, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[6] <= 0.9148696959018707) {
                                if (input[0] <= -1.1233580112457275) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[8] <= 1.822881817817688) {
                            if (input[1] <= 0.9481453895568848) {
                                if (input[10] <= 1.6644272953271866) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.6666666666666666, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[5] <= 0.833856612443924) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0273972602739726, 0.9726027397260274, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.4182716906070709) {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[8] <= 0.14957740902900696) {
                    if (input[8] <= 0.1407931223511696) {
                        memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    }
                } else {
                    if (input[4] <= -0.7060906887054443) {
                        if (input[9] <= -0.4367627948522568) {
                            memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                        } else {
                            if (input[5] <= 0.461371585726738) {
                                if (input[0] <= -0.17164168506860733) {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[0] <= 0.05817871168255806) {
                            if (input[5] <= -0.06218739598989487) {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -0.40646280348300934) {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var28, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var3, var28, 8, var2);
    double var29[8];
    if (input[3] <= -0.20962481945753098) {
        if (input[8] <= 0.08627868443727493) {
            if (input[3] <= -0.5132375061511993) {
                if (input[7] <= -0.7727343738079071) {
                    if (input[7] <= -0.9241800606250763) {
                        if (input[7] <= -1.055560290813446) {
                            if (input[3] <= -0.5164932310581207) {
                                if (input[8] <= -0.6068221628665924) {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.9, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.62497279047966) {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -0.22278743982315063) {
                                if (input[7] <= -1.0550916194915771) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.9585253456221198, 0.0, 0.0, 0.0, 0.0, 0.0, 0.041474654377880185, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.6234342455863953) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.8571428571428571, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14285714285714285, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.5999001264572144) {
                            if (input[8] <= -0.6232341527938843) {
                                if (input[7] <= -0.8758981227874756) {
                                    memcpy(var29, (double[]){0.23529411764705882, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6470588235294118, 0.11764705882352941}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.8222222222222222, 0.0, 0.0, 0.0, 0.0, 0.0, 0.17777777777777778, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[3] <= -0.5205447375774384) {
                                    memcpy(var29, (double[]){0.900709219858156, 0.0, 0.0, 0.0, 0.0, 0.0, 0.09219858156028368, 0.0070921985815602835}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.3333333333333333, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6666666666666666, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[9] <= 0.39621855318546295) {
                                if (input[3] <= -0.6439125835895538) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[9] <= 0.9632912278175354) {
                        if (input[3] <= -0.6503261625766754) {
                            if (input[7] <= -0.6279377937316895) {
                                if (input[8] <= -0.6033609807491302) {
                                    memcpy(var29, (double[]){0.42857142857142855, 0.0, 0.02857142857142857, 0.0, 0.0, 0.0, 0.5428571428571428, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.7731194496154785) {
                                    memcpy(var29, (double[]){0.003500583430571762, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9964994165694282, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.5660514533519745) {
                                if (input[5] <= -1.076076090335846) {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.38317757009345793, 0.0, 0.0, 0.0, 0.0, 0.0, 0.616822429906542, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[0] <= 1.8514888286590576) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                    }
                }
            } else {
                if (input[0] <= 1.420777142047882) {
                    if (input[8] <= -0.5313184261322021) {
                        if (input[3] <= -0.314904123544693) {
                            if (input[9] <= 0.6944597512483597) {
                                if (input[0] <= -0.20896847546100616) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.8, 0.0, 0.0, 0.0, 0.2, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.037037037037037035, 0.0, 0.0, 0.0, 0.9629629629629629, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= -0.8102712035179138) {
                                memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[1] <= -0.5801303535699844) {
                            if (input[8] <= -0.45576295256614685) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[9] <= 0.3882105126976967) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                            }
                        }
                    }
                } else {
                    if (input[7] <= -0.4532896429300308) {
                        if (input[7] <= -0.5931086242198944) {
                            if (input[7] <= -0.745596170425415) {
                                memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= -0.6245139837265015) {
                                    memcpy(var29, (double[]){0.8888888888888888, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1111111111111111, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[10] <= 1.6644272953271866) {
                                if (input[5] <= -0.6672635674476624) {
                                    memcpy(var29, (double[]){0.6666666666666666, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3333333333333333, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                    }
                }
            }
        } else {
            if (input[0] <= -1.1531367301940918) {
                if (input[4] <= -1.5524008870124817) {
                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[4] <= -1.1654881238937378) {
                        if (input[9] <= 0.008646003901958466) {
                            if (input[1] <= 1.663309633731842) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= -1.505840003490448) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    } else {
                        if (input[0] <= -1.159782350063324) {
                            if (input[8] <= 1.6040887832641602) {
                                if (input[9] <= 0.3270518183708191) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.5, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.5959647297859192) {
                                    memcpy(var29, (double[]){0.0, 0.08695652173913043, 0.0, 0.0, 0.0, 0.9130434782608695, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= -0.9372044801712036) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        }
                    }
                }
            } else {
                if (input[8] <= 1.5897586941719055) {
                    if (input[2] <= -1.9288909435272217) {
                        if (input[8] <= 0.47583307325839996) {
                            if (input[0] <= -0.26209375262260437) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[7] <= 1.2046080827713013) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= -0.7696124464273453) {
                                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= 1.1252701878547668) {
                            if (input[1] <= 0.9331851601600647) {
                                if (input[2] <= 0.3068868815898895) {
                                    memcpy(var29, (double[]){0.0, 0.023255813953488372, 0.0, 0.0, 0.0, 0.9457364341085271, 0.031007751937984496, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.75, 0.25, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= 0.8077923953533173) {
                                    memcpy(var29, (double[]){0.0, 0.03076923076923077, 0.0, 0.0, 0.0, 0.8346153846153846, 0.1346153846153846, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0819672131147541, 0.0, 0.0, 0.0, 0.6352459016393444, 0.2827868852459017, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= -0.6535818874835968) {
                                if (input[9] <= 0.23239296674728394) {
                                    memcpy(var29, (double[]){0.0, 0.08587257617728533, 0.0, 0.0, 0.0, 0.698060941828255, 0.21606648199445985, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.8773584905660378, 0.0, 0.0, 0.0, 0.018867924528301886, 0.10377358490566038, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= -0.058032527565956116) {
                                    memcpy(var29, (double[]){0.0, 0.2323943661971831, 0.0, 0.0, 0.0, 0.647887323943662, 0.11971830985915492, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= 1.1801937222480774) {
                        if (input[3] <= -0.7039610147476196) {
                            if (input[5] <= 0.3606315404176712) {
                                if (input[9] <= 0.010550637729465961) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.75, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.37526463717222214) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[5] <= -0.07199745625257492) {
                                if (input[2] <= 0.030504941940307617) {
                                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.5723032280802727) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.9411764705882353, 0.058823529411764705, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= 0.9865453541278839) {
                            if (input[5] <= 1.303438663482666) {
                                if (input[9] <= -0.5039686560630798) {
                                    memcpy(var29, (double[]){0.0, 0.28571428571428575, 0.0, 0.0, 0.0, 0.28571428571428575, 0.4285714285714286, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.9315068493150684, 0.0, 0.0, 0.0, 0.0410958904109589, 0.0273972602739726, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= 1.2769047021865845) {
                                if (input[4] <= -0.8454231917858124) {
                                    memcpy(var29, (double[]){0.0, 0.972809667673716, 0.0, 0.0, 0.0, 0.002014098690835851, 0.025176233635448138, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[4] <= -1.5301870703697205) {
                                    memcpy(var29, (double[]){0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (input[3] <= 1.3669644594192505) {
            if (input[7] <= -0.7642365992069244) {
                if (input[1] <= -0.5926024615764618) {
                    if (input[5] <= 0.004861628171056509) {
                        if (input[9] <= -0.008009922690689564) {
                            if (input[0] <= 1.9267906546592712) {
                                if (input[0] <= 1.6241037249565125) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.9469339622641509, 0.02830188679245283, 0.024764150943396228, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.4444444444444444, 0.0, 0.5555555555555556, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.9028723537921906) {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.9166666666666666, 0.0, 0.08333333333333333, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[7] <= -0.864003986120224) {
                                if (input[4] <= 0.36526642739772797) {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.7777777777777778, 0.0, 0.1111111111111111, 0.1111111111111111, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= 0.117272830568254) {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[8] <= -0.5878713726997375) {
                            if (input[2] <= 0.014004599768668413) {
                                memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[0] <= 1.585775911808014) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.9948979591836735, 0.0, 0.00510204081632653, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.16814742982387543) {
                                memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[8] <= -0.5864456593990326) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                } else {
                    if (input[7] <= -1.0676272511482239) {
                        memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                    } else {
                        if (input[2] <= 0.21481382101774216) {
                            if (input[3] <= 1.0413938462734222) {
                                if (input[3] <= 0.3565145693719387) {
                                    memcpy(var29, (double[]){0.6666666666666666, 0.0, 0.0, 0.3333333333333333, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[3] <= 1.2025513052940369) {
                                if (input[2] <= 1.353552758693695) {
                                    memcpy(var29, (double[]){0.018518518518518517, 0.0, 0.0, 0.9814814814814815, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.7142857142857143, 0.2857142857142857, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.23820944875478745) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            } else {
                if (input[3] <= 1.094494879245758) {
                    if (input[9] <= 0.3864009529352188) {
                        if (input[7] <= -0.591503381729126) {
                            if (input[6] <= -1.4846678972244263) {
                                if (input[3] <= -0.10456211399286985) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[8] <= -0.5975429713726044) {
                                    memcpy(var29, (double[]){0.07142857142857144, 0.0, 0.3428571428571429, 0.5428571428571429, 0.042857142857142864, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.04255319148936171, 0.946808510638298, 0.010638297872340427, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[1] <= -1.6631351113319397) {
                                memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[3] <= 0.7743098735809326) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.001358695652173913, 0.998641304347826, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.00602409638554217, 0.8795180722891567, 0.11445783132530121, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[5] <= 0.3781742723658681) {
                            if (input[0] <= -0.40038324892520905) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[4] <= 0.37483472749590874) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0}, 8 * sizeof(double));
                        }
                    }
                } else {
                    if (input[8] <= -0.6040092408657074) {
                        if (input[1] <= -0.6853021383285522) {
                            if (input[1] <= -1.5820286870002747) {
                                memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[6] <= -0.12394459545612335) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.5384615384615384, 0.07692307692307693, 0.38461538461538464, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[2] <= 0.26054588705301285) {
                                if (input[3] <= 1.2502058744430542) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.06666666666666667, 0.0, 0.9333333333333333, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.38461538461538464, 0.6153846153846154, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.05195271596312523) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.030303030303030304, 0.5151515151515151, 0.45454545454545453, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[1] <= -0.34010350704193115) {
                            if (input[2] <= -0.18272846192121506) {
                                if (input[1] <= -1.0841652154922485) {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.1, 0.0, 0.9, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.6296063661575317) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.05555555555555555, 0.8333333333333334, 0.1111111111111111, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.05, 0.3, 0.65, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[3] <= 1.1021555662155151) {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            } else {
                                if (input[2] <= 0.13397407159209251) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.375, 0.625, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.851063829787234, 0.14893617021276595, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (input[7] <= -0.8838351368904114) {
                if (input[7] <= -1.069984495639801) {
                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[1] <= -0.5900789201259613) {
                        if (input[8] <= -0.5967779159545898) {
                            if (input[0] <= 1.0937392115592957) {
                                if (input[7] <= -1.065086543560028) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.8909090909090909, 0.0, 0.10909090909090909, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[4] <= 0.6325052380561829) {
                                if (input[1] <= -1.139365315437317) {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.3333333333333333, 0.6666666666666666, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[7] <= -0.9789048433303833) {
                                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[3] <= 1.778811275959015) {
                            if (input[8] <= -0.5681628584861755) {
                                if (input[4] <= -0.2278783693909645) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.1111111111111111, 0.8888888888888888, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[6] <= -0.4612705856561661) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.75, 0.25, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                        }
                    }
                }
            } else {
                if (input[1] <= -1.459713876247406) {
                    memcpy(var29, (double[]){0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                } else {
                    if (input[6] <= -1.0660077929496765) {
                        if (input[8] <= -0.5917529165744781) {
                            if (input[3] <= 1.8756548166275024) {
                                if (input[3] <= 1.6530858278274536) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.5, 0.20833333333333334, 0.2916666666666667, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.046511627906976744, 0.8604651162790697, 0.09302325581395349, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[2] <= 1.1846202313899994) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.8, 0.2, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        } else {
                            if (input[4] <= 0.23860881477594376) {
                                if (input[5] <= -0.0824107090011239) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.7777777777777778, 0.2222222222222222, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.16666666666666666, 0.8333333333333334, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[9] <= -0.5895878970623016) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.05555555555555555, 0.9444444444444444, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    } else {
                        if (input[0] <= 0.2157875820994377) {
                            if (input[5] <= 0.7313358783721924) {
                                if (input[3] <= 1.9087429642677307) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.04090909090909091, 0.3196969696969697, 0.6393939393939394, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.017482517482517484, 0.024475524475524476, 0.958041958041958, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                memcpy(var29, (double[]){0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                            }
                        } else {
                            if (input[5] <= 0.3133360743522644) {
                                if (input[0] <= 0.9601466953754425) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.010775862068965518, 0.09698275862068965, 0.8922413793103449, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            } else {
                                if (input[10] <= 1.6644272953271866) {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.0, 0.1951219512195122, 0.8048780487804879, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                } else {
                                    memcpy(var29, (double[]){0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 0.0}, 8 * sizeof(double));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    add_vectors(var2, var29, 8, var1);
    mul_vector_number(var1, 0.06666666666666667, 8, var0);
    memcpy(output, var0, 8 * sizeof(double));
}


#endif // HAZARD_TREE_H
