import React from "react";
import countries from "./CountryName";
import { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

// const countries;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [countryData] = useState(countries);
  const [searchedCountries, setSearchedCountries] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const delayFn = setTimeout(() => {
      const data =
        searchItem !== ""
          ? countryData.filter((d) =>
            d.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())
          )
          : [];
      setSearchedCountries(data);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(delayFn);
  }, [searchItem]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Search Country Name</InputLabel>
            <OutlinedInput
              value={searchItem}
              onChange={handleChange}
              // startAdornment={<InputAdornment><SearchIcon /></InputAdornment>}
              endAdornment={<InputAdornment><SearchIcon /></InputAdornment>}
              labelWidth={160}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {isLoading && searchItem !== "" &&
            <Paper style={{ textAlign: 'center' }}>
              <p>Loading Please wait</p>
              <img src="./loading.gif" style={{ width: '100%' }} />
            </Paper>}
          {!isLoading && searchItem !== "" && searchedCountries.length === 0 &&
            <Paper style={{ textAlign: 'center' }}>
              <img src="./no-result.png" style={{ width: '100%' }} />
            </Paper>}
          {!isLoading && searchItem !== "" && searchedCountries.length !== 0 &&
            <Paper >
              <TableContainer component={Paper}>
                <Table
                  aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Country Name</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchedCountries.map((d) => (
                      <StyledTableRow key={d}>
                        <StyledTableCell component="th" scope="row">
                          {d}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>}
        </Grid>
        <Grid item xs={12} sm={searchItem !== "" ? 6 : 12}>
          <Paper >
            <TableContainer component={Paper}>
              <Table
                aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Country Name</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countryData.map((d) => (
                    <StyledTableRow key={d}>
                      <StyledTableCell component="th" scope="row">
                        {d}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
