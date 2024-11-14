import React from "react";
import { Box, Container, Typography, Paper, List, ListItem } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const PersonalInformationProcessingPolicyPage = () => {
    return(
        <Container>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h3" gutterBottom textAlign="center" sx={{ paddingBottom: 5 }}>
                    개인정보 보호정책
                </Typography>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    1. BLY 개인정보 처리방침
                    </Typography>
                    <Typography variant="body1" paragraph>
                    “개인정보 처리방침”이란 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미하며, BLY는 개인정보처리자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리방침을 제공합니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    BLY는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있습니다. 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장하기 위해 개인정보 처리방침을 알기 쉽게 제공할 수 있도록 다양한 노력을 기울이고 있습니다.
                    </Typography>
                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    2. 개인정보 수집
                    </Typography>
                    <Typography variant="body1" paragraph>
                    서비스 제공을 위한 필요 최소한의 개인정보를 수집합니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 서비스 제공을 위해 필요 최소한의 개인정보를 수집하고 있습니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    서비스 제공을 위해 반드시 필요한 최소한의 정보를 필수항목으로, 그 외 특화된 서비스를 제공하기 위해 추가 수집하는 정보는 선택항목으로 동의를 받고 있으며, 선택항목에 동의하지 않은 경우에도 서비스 이용 제한은 없습니다.
                    </Typography>

                    <TableContainer sx={{ marginBottom: 5 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        요구 시
                                    </TableCell>
                                    <TableCell>요구</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>BLY계정 가입 시</TableCell>
                                    <TableCell>[필수] 이메일, 비밀번호, 이름(닉네임)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>이메일 인증 시</TableCell>
                                    <TableCell>[필수] 이메일</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>고객상담 시</TableCell>
                                    <TableCell>고객센터로 문의 및 상담 시 상담 처리를 위한 추가적인 정보를 수집할 수 있습니다.</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="body1" paragraph>
                    개인정보를 수집하는 경우에는 원칙적으로 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.
                    </Typography>

                    <List>
                        <ListItem>회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우</ListItem>
                    </List>

                    <Typography variant="body1" paragraph>
                    서비스 이용 과정에서 단말기정보, IP주소, 쿠키, 서비스 이용 내역* 등의 정보가 자동으로 생성되어 수집될 수 있습니다.
                    *서비스 이용 내역이란 서비스 이용 과정에서 자동화된 방법으로 생성되거나 이용자가 입력한 정보가 송수신되면서 BLY 서버에 자동으로 기록 및 수집될 수 있는 정보를 의미합니다. 이와 같은 정보는 다른 정보와의 결합 여부, 처리하는 방식 등에 따라 개인정보에 해당할 수 있고 개인정보에 해당하지 않을 수도 있습니다.
                    </Typography>

                    <Typography variant="body1" paragraph>
                    서비스 이용 내역에는 이용자가 입력 및 공유한 콘텐츠, 이용자가 입력한 검색어, 방문 및 접속기록, 서비스 부정이용 기록 등이 포함될 수 있습니다.
                    </Typography>

                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    3. 개인정보 이용
                    </Typography>
                    <Typography variant="body1" paragraph>
                    회원관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다.
                    </Typography>
                    <List>
                        <ListItem>- 회원 식별/가입의사 확인</ListItem>
                        <ListItem>- 문의사항 또는 불만처리, 공지사항 전달</ListItem>
                        <ListItem>- 서비스의 원활한 운영에 지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한 방지 및 제재</ListItem>
                        <ListItem>- 신규 서비스 개발 및 서비스 기능 개선, 개인화된 서비스 제공, 프라이버시 보호를 위한 서비스 환경 구축</ListItem>
                        <ListItem>- 서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계</ListItem>
                        <ListItem>- 개인정보의 추가적인 이용・제공</ListItem>
                        <ListItem>등의 경우가 있습니다.</ListItem>
                    </List>

                    <Typography variant="body1" paragraph>
                    수집 목적과 합리적으로 관련된 범위에서는 법령에 따라 이용자의 동의 없이 개인정보를 이용하거나 제3자에게 제공할 수 있습니다. 이때 ‘당초 수집 목적과 관련성이 있는지, 수집한 정황 또는 처리 관행에 비추어 볼 때 개인정보의 추가적인 이용 또는 제공에 대한 예측 가능성이 있는지, 이용자의 이익을 부당하게 침해하는지, 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지’를 종합적으로 고려합니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    BLY는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 처리할 수 있습니다. 이 때 가명정보는 재식별되지 않도록 추가정보와 분리하여 별도 저장・관리하고 필요한 기술적・관리적 보호조치를 취합니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    먼저, 가명정보에 접근할 수 있는 권한은 최소한의 인원으로 제한하며, 접근 권한을 관리하고 있습니다. 가명정보를 보호하기 위해 보안 시스템을 운영하며, 정기적인 내부 감사를 통해 가명처리 및 보호조치가 적절하게 이행되고 있는지 확인하고 개선 사항을 지속적으로 반영합니다. 또한, 가명정보를 취급하는 직원들에게 정기적으로 교육을 실시하고 있습니다.
                    </Typography>

                    <TableContainer sx={{ marginBottom: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        사용 목적
                                    </TableCell>
                                    <TableCell>
                                        사용 내용
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>개인정보 처리</TableCell>
                                    <TableCell>이용자의 동의를 받아 수집한 개인정보 항목은 회원 관리 등 서비스 제공을 위해 필요한 목적으로 처리합니다. BLY에서 처리하는 개인정보 항목 및 이용 목적은 개인정보 처리방침을 통해 상시 공개하고 있습니다.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>추가적 이용</TableCell>
                                    <TableCell>당초 수집 목적과 관련성, 수집한 정황 또는 처리 관행 등을 종합적으로 고려하여 수집 목적과 합리적으로 관련된 범위에서 추가적으로 개인정보를 이용 및 제공할 수 있습니다.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>가명정보 처리</TableCell>
                                    <TableCell>수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계작성, 과학적 연구, 공익적 기록보존 등을 위해 처리할 수 있습니다.</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    4. 개인정보 제공
                    </Typography>
                    <Typography variant="body1" paragraph>
                    BLY는 이용자의 별도 동의가 있거나 법령에 규정된 경우를 제외하고는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                    </Typography>
                    <Typography variant="body1" paragraph>BLY는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자가 BLY계정 로그인 서비스를 이용하거나 외부 제휴사 등의 서비스를 이용하는 경우 필요한 범위 내에서 이용자의 동의를 얻은 후에 개인정보를 제3자에게 제공하고 있습니다.</Typography>
                    <Typography variant="body1" paragraph>또한 해외 서비스 이용을 위해 이용자의 동의를 받아 국외로 개인정보가 제공될 수 있으며, 국외 이전 시 제공받는 자 및 이전국가 등에 대해 고지하여 별도 동의를 받고 있습니다.</Typography>
                    <Typography variant="body1" paragraph>BLY는 재난, 감염병, 급박한 생명・신체 위험을 초래하는 사건사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다.</Typography>

                    <Typography variant="body1" paragraph>서비스 제공을 위해 아래와 같은 업무를 위탁합니다.</Typography>
                    <Typography variant="body1" paragraph>서비스 제공을 위해 필요한 경우 개인정보 처리 업무 중 일부를 외부에 위탁할 수 있습니다. 위탁받은 업체가 위탁받은 업무 목적 외로 개인정보를 처리하는 것을 제한하고, 기술적・관리적 보호조치 적용 및 재위탁 제한 등 위탁받은 업체의 개인정보 보호 관련 법령 준수 여부를 관리·감독하고 있습니다. 이용자는 고객센터를 통해 개인정보의 국외 이전을 거부할 수 있습니다.</Typography>

                    <TableContainer sx={{ marginBottom: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        위탁 방법
                                    </TableCell>
                                    <TableCell>
                                        위탁 목적
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>제3자 제공</TableCell>
                                    <TableCell>외부 제휴사 등의 서비스 이용 시 이용자에게 제3자 제공 동의를 받은 후 개인정보를 제공하고 있습니다. 개인정보가 제공될 수 있는 제3자 업체 목록은 BLY 개인정보 처리방침을 통해 확인하실 수 있습니다.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>처리위탁</TableCell>
                                    <TableCell>BLY 서비스 제공이 있어 반드시 필요한 업무 중 일부를 외부 업체에서 수행할 수 있도록 개인정보를 위탁하고 있습니다. 위탁 시 위탁받은 업체가 개인정보보호 관련 법령을 준수할 수 있도록 정기적으로 관리᛫감독하고 있습니다.</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    5. 개인정보 파기
                    </Typography>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>수집 및 이용목적이 달성된 경우 수집한 개인정보는 지체없이 파기하며, 절차 및 방법은 아래와 같습니다.</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기 사유가 발생한 경우 개인정보의 형태를 고려하여 파기방법을 정합니다. 전자적 파일 형태인 경우 복구 및 재생되지 않도록 안전하게 삭제하고, 그 밖에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.
                        </Typography>
                    </Paper>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>내부 방침에 따라 일정 기간 보관 후 파기하는 정보는 아래와 같습니다.</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            1) 아래 정보는 탈퇴일부터 최대 1년간 보관 후 파기합니다.
                            <List>
                                <ListItem>- 안내메일 발송 및 CS문의 대응을 위해 BLY계정과 탈퇴안내 이메일 주소를 암호화하여 보관</ListItem>
                                <ListItem>- 서비스 부정이용 기록</ListItem>
                            </List>
                            2) 권리침해 신고 및 유해정보 신고 이력은 5년간 보관 후 파기합니다.
                            <List>
                                <ListItem>※ 또한, BLY는 운영정책에 따라 1년간 서비스를 이용하지 않은 이용자의 개인정보를 별도로 분리 보관 또는 삭제하고 있으며, 분리 보관된 개인정보는 4년간 보관 후 지체없이 파기합니다.</ListItem>
                            </List>
                        </Typography>
                    </Paper>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>보유기간 및 파기</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기사유가 발생한 개인정보는 안전하게 파기합니다. 수집된 개인정보는 사전에 안내된 보유기간 동안만 보관 후 파기하며, 관계법령에 따라 일정보관이 필요한 정보는 별도로 보관합니다.
                        </Typography>
                    </Paper>

                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    6. 이용자 및 법정대리인의 권리와 행사 방법
                    </Typography>

                    <Typography variant="body1" paragraph>
                    이용자는 자신의 개인정보 처리에 관하여 아래와 같은 권리를 가질 수 있습니다
                    </Typography>
                    <List>
                        <ListItem>- 개인정보 열람(조회)을 요구할 권리</ListItem>
                        <ListItem>- 개인정보 정정을 요구할 권리</ListItem>
                        <ListItem>- 개인정보 처리정지를 요구할 권리</ListItem>
                        <ListItem>- 개인정보 삭제요구 및 동의철회/탈퇴를 요구할 권리</ListItem>
                        <ListItem>- 이용자는 서비스 내 다음과 같은 기능을 통해 언제든지 개인정보 열람(조회) 등의 권리를 직접 행사하거나 또는 고객센터를 통해 요청할 수 있습니다.</ListItem>
                    </List>

                    <Typography variant="body1" paragraph>BLY는 이용자의 요청을 받은 경우 이를 지체없이 처리하며, 이용자가 개인정보의 오류에 대한 정정을 요청한 경우 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.</Typography>
                    <Typography variant="body1" paragraph>14세 미만 아동의 개인정보를 처리할 경우에는 법정대리인의 동의를 받아야 합니다. 법정대리인은 아동의 개인정보를 조회하거나 수정 및 삭제, 처리정지 및 동의 철회 등의 권리를 행사할 수 있습니다.</Typography>
                    <Typography variant="body1" paragraphp>법정대리인 동의를 받기 위하여 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 아래 방법으로 법정대리인의 동의를 확인합니다.</Typography>
                    <Typography variant="body1" paragraphp>법정대리인의 휴대전화 본인인증을 통해 본인여부를 확인하는 방법</Typography>
                    <Typography variant="body1" paragraphp>법정대리인에게 동의내용이 적힌 서면을 제공하여 서명날인 후 제출하게 하는 방법</Typography>
                    <Typography variant="body1" paragraphp>그 밖에 위와 준하는 방법으로 법정대리인에게 동의내용을 알리고 동의의 의사표시를 확인하는 방법</Typography>

                    <Paper sx={{ padding: 2,  marginTop: 2, marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>정보주체의 권리의무</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        BLY 이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 동의한 개인정보 처리에 대해 동의 철회를 요구할 수 있습니다.
                        </Typography>
                    </Paper>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>법정대리인</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        만 14세 미만 아동 이용자의 경우, 법정대리인의 아동의 개인정보에 대한 조회, 수정, 삭제, 처리정지 및 동의를 철회할 수 있는 권리를 보장합니다.
                        </Typography>
                        <Typography variant="body2" paragraph>
                        또한, '온라인 맞춤형 광고 개인정보보호 가이드 라인'에 따른 이용자 권리보호를 위한 페이지도 제공하고 있습니다.
                        </Typography>
                    </Paper>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>행태정보 수집</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        이용자에게 불필요한 광고의 노출을 줄이고, 유용한 광고를 제공하기 위해 이용자의 관심사 등을 기반으로 하는 행태정보 기반의 맞춤형 광고를 제공하고 있습니다.
                        </Typography>
                    </Paper>

                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    7. 개인정보의 안전성 확보 조치에 관한 사항
                    </Typography>
                    <Typography variant="body1" paragraph>
                    BLY는 이용자의 개인정보 보호를 위해 아래의 노력을 합니다.
                    </Typography>
                    <List>
                        <ListItem>- 이용자의 개인정보를 암호화하고 있습니다.</ListItem>
                        <ListItem>- 이용자의 개인정보를 암호화된 통신구간을 이용하여 전송하고, 비밀번호 등 중요정보는 암호화하여 보관하고 있습니다.</ListItem>
                        <ListItem>- 해킹이나 컴퓨터 바이러스로부터 보호하기 위하여 노력하고 있습니다.</ListItem>
                        <ListItem>- 해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 외부로부터 접근이 통제된 구역에 시스템을 설치하고 있습니다. 해커 등의 침입을 탐지하고 차단할 수 있는 시스템을 설치하여 24시간 감시하고 있으며, 백신 프로그램을 설치하여 시스템이 최신 악성코드나 바이러스에 감염되지 않도록 노력하고 있습니다. 또한 새로운 해킹/보안 기술에 대해 지속적으로 연구하여 서비스에 적용하고 있습니다.</ListItem>
                        <ListItem>- 개인정보에 접근할 수 있는 사람을 최소화하고 있습니다.</ListItem>                            
                        <ListItem>- 개인정보취급자에게 이용자의 개인정보 보호에 대해 정기적인 교육을 실시하고 있습니다.</ListItem>
                        <ListItem>- 개인정보를 처리하는 모든 개인정보취급자 대상으로 개인정보보호 의무와 보안에 대한 정기적인 교육과 캠페인을 실시하고 있습니다.</ListItem>
                        <ListItem>- 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</ListItem>                                                        
                    </List>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>안전성 확보조치</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        이용자의 개인정보를 안전하게 관리하기 위해 개인정보보호법에 따른 법적 요구사항을 모두 준수하고 있으며, 보호조치 수준에 대해서는 내부 점검 및 외부 검증을 통해 정기적으로 확인하고 있습니다.
                        </Typography>
                    </Paper>
                    
                </Paper>

                <Paper sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
                    8. 개정 전 고지의무 등 안내
                    </Typography>
                    <Typography variant="body1" paragraph>
                    법령이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보 처리방침을 수정할 수 있습니다. 개인정보 처리방침이 변경되는 경우 최소 7일 전 변경 사항을 사전에 안내 하겠습니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    다만, 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 미리 알려드리겠습니다.
                    </Typography>
                    <Typography variant="body1" paragraph>
                    BLY는 이용자 여러분의 정보를 소중히 생각하며, 이용자가 더욱 안심하고 서비스를 이용할 수 있도록 최선의 노력을 다할것을 약속드립니다.
                    </Typography>

                    <Typography variant="body1" paragraph>공고일자: 2024년 11월 11일</Typography>
                    <Typography variant="body1" paragraph>시행일자: 2024년 11월 18일</Typography>

                    <Paper sx={{ padding: 2,  marginBottom: 2 }}>
                        <Typography variant="body1" paragraph>
                            <b>개인정보 처리방침 변경</b>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        법령이나 서비스 변경으로 인해 개인정보 처리방침이 개정될 수 있으며, 개인정보 처리방침 변경 시 공지사항을 통해 이용자 여러분들께 사전에 변경사항을 공지합니다.
                        </Typography>
                    </Paper>
                    
                </Paper>

            </Paper>
        </Container>

    );
};

export default PersonalInformationProcessingPolicyPage;
